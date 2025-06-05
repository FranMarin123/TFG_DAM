package com.francisco.servly.model.dto;

import java.util.Objects;

public class ServerCommandScriptDto extends ServerIPCredentialDto{

    private String command;

    public ServerCommandScriptDto(String serverIP, String username, String password, String command) {
        super(serverIP, username, password);
        this.command = command;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ServerCommandScriptDto that = (ServerCommandScriptDto) o;
        return Objects.equals(command, that.command);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), command);
    }
}
