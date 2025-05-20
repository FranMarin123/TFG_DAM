import { Galleria, type GalleriaResponsiveOptions } from 'primereact/galleria';

export default function ImagesCollection() {

    const images: string[] = [
        "https://nattia.com/wp-content/uploads/2024/04/servidores_rack.webp", 
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRivzy6GhiDnOT56d23pm3n6Gm2VvOcxEhJtw&s", 
        "https://www.cloudcenterandalucia.es/wp-content/uploads/2021/05/Servidor-web_Cloud-Center-Andalucia_3.png"
    ];

    const responsiveOptions: GalleriaResponsiveOptions[] = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item: any) => {
        return <img src={item} style={{ width: '100%' }} />
    }

    return (
        <div className="card">
            <Galleria value={images} responsiveOptions={responsiveOptions} style={{ width: '640px', height: '600px' }} 
                item={itemTemplate} circular autoPlay transitionInterval={2000} />
        </div>
    )
}
        