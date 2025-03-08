import { useEffect, useState } from 'react';
import { decodeToken } from '@/utils/decode-token';
import { getMisionsByShinobi, getShinobi } from '@/services';
import { Shinobi } from '@/interfaces/shinobi';
import { ShinobiMisions } from '@/interfaces/mision';


export const useProfile = () => {
    const [shinobiInfo, setShinobiInfo] = useState<Shinobi>({
        _id: '',
        alias: '',
        fecha_ingreso: new Date(),
        password: '',
        rango: '',
        estado: '',
    });

    const [misionsShinobi, setMisionsShinobi] = useState<ShinobiMisions>({
        misionesCompletas: [],
        misionesFallidas: [],
        misionesRetrasadas: [],
        misionesPendientes: [],

    });

    const { alias } = decodeToken();

    useEffect(() => {
        const fetchData = async () => {
            const [shinobi, misionsShinobi] = await Promise.all([
                await getShinobi(alias),
                await getMisionsByShinobi(alias)
            ]);


            setShinobiInfo(shinobi);
            setMisionsShinobi(misionsShinobi.data);
        };

        fetchData();
    }, []);

    return { shinobiInfo, misionsShinobi };
}