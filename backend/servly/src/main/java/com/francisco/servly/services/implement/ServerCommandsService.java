package com.francisco.servly.services.implement;

import com.jcraft.jsch.*;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

@Service
public class ServerCommandsService {

    public boolean checkConnection(String ip, String username, String password) {
        try {
            Session session = getSession(ip, username, password);
            session.connect(5000);
            session.disconnect();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String executeCommand(String ip, String username, String password, String command) throws Exception {
        if (command.trim().startsWith("sudo")) {
            command = "echo '" + password + "' | sudo -S " + command.substring(5);
        }
        return execViaSSH(ip, username, password, command);
    }

    public String executeScript(String ip, String username, String password, String scriptContent) throws Exception {
        String scriptName = "/tmp/temp_script.sh";
        String command = "echo '" + scriptContent.replace("'", "'\"'\"'") + "' > " + scriptName + " && chmod +x " + scriptName + " && " + scriptName;
        return executeCommand(ip, username, password, command);
    }

    public void rebootServer(String ip, String username, String password) throws Exception {
        executeCommand(ip, username, password, "sudo reboot");
    }

    public void shutdownServer(String ip, String username, String password) throws Exception {
        executeCommand(ip, username, password, "sudo shutdown now");
    }

    public Map<String, Double> getServerMetrics(String ip, String username, String password) throws Exception {
        Map<String, Double> metrics = new HashMap<>();
        Session session = getSession(ip, username, password);
        session.connect();

        metrics.put("cpu", getCpuUsage(session));
        metrics.put("ram", getRamUsage(session));
        metrics.put("disk", getDiskUsage(session));
        metrics.put("net_download", getNetRxMBps(session));

        session.disconnect();
        return metrics;
    }

    public Session getSession(String ip, String username, String password) throws JSchException {
        JSch jsch = new JSch();
        Session session = jsch.getSession(username, ip, 22);
        session.setPassword(password);
        session.setConfig("StrictHostKeyChecking", "no");
        return session;
    }

    public String execViaSSH(String ip, String username, String password, String command) throws Exception {
        Session session = getSession(ip, username, password);
        session.connect(5000);
        ChannelExec channel = (ChannelExec) session.openChannel("exec");
        channel.setCommand(command);
        channel.setInputStream(null);
        InputStream in = channel.getInputStream();
        channel.connect();

        Scanner scanner = new Scanner(in).useDelimiter("\\A");
        String result = scanner.hasNext() ? scanner.next() : "";

        channel.disconnect();
        session.disconnect();
        return result;
    }

    public String execCommand(Session session, String command) throws Exception {
        ChannelExec channel = (ChannelExec) session.openChannel("exec");
        channel.setCommand(command);
        channel.setInputStream(null);
        InputStream in = channel.getInputStream();
        channel.connect();

        Scanner scanner = new Scanner(in).useDelimiter("\\A");
        String result = scanner.hasNext() ? scanner.next() : "";

        channel.disconnect();
        return result;
    }

    public double getCpuUsage(Session session) throws Exception {
        String output = execCommand(session, "top -bn1 | grep 'Cpu(s)'");
        String[] parts = output.split(",");
        for (String part : parts) {
            if (part.contains("id")) {
                double idle = Double.parseDouble(part.trim().split(" ")[0]);
                return 100.0 - idle;
            }
        }
        return -1;
    }

    public double getRamUsage(Session session) throws Exception {
        String output = execCommand(session, "free -m");
        String[] lines = output.split("\n");
        for (String line : lines) {
            if (line.startsWith("Mem:")) {
                String[] parts = line.trim().split("\\s+");
                double total = Double.parseDouble(parts[1]);
                double used = Double.parseDouble(parts[2]);
                return (used / total) * 100.0;
            }
        }
        return -1;
    }

    public double getDiskUsage(Session session) throws Exception {
        String output = execCommand(session, "df -h / | tail -1");
        String[] parts = output.trim().split("\\s+");
        return Double.parseDouble(parts[4].replace("%", ""));
    }

    public long getRxBytes(Session session) throws Exception {
        String output = execCommand(session,
                "cat /proc/net/dev | grep ':' | grep -v lo | awk '{print $2}' | paste -sd+ - | bc");
        return Long.parseLong(output.trim());
    }

    public double getNetRxMBps(Session session) throws Exception {
        long before = getRxBytes(session);
        Thread.sleep(1000);
        long after = getRxBytes(session);
        return (after - before) / (1024.0 * 1024.0); // MB/s
    }
}
