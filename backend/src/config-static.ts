import { DateTime } from 'luxon'
import { Config } from "./domain"

export const staticConfig: Config = {
    horas: {
        officiumLectionis: {
            key: "officiumLectionis",
            name: "Officium lectionis",
            shortName: "Officium",
            defaultHour: "00:00",
            link: {
                pl: { href: (dt: DateTime) => getBrewiarzPLLink(dt, "gc") }
            }
        },
        laudesMatutinae: {
            key: "laudesMatutinae",
            name: "Laudes matutinae",
            shortName: "Laudes",
            defaultHour: "7:00",
            link: {
                pl: { href: (dt: DateTime) => getBrewiarzPLLink(dt, "jt") }
            }
        },
        tertia: {
            key: "tertia",
            name: "Tertia",
            shortName: "Tertia",
            defaultHour: "9:00",
            link: {
                pl: { href: (dt: DateTime) => getBrewiarzPLLink(dt, "m1") }
            }
        },
        sexta: {
            key: "sexta",
            name: "Sexta",
            shortName: "Sexta",
            defaultHour: "12:00",
            link: {
                pl: { href: (dt: DateTime) => getBrewiarzPLLink(dt, "m2") }
            }
        },
        nona: {
            key: "nona",
            name: "Nona",
            shortName: "Nona",
            defaultHour: "15:00",
            link: {
                pl: { href: (dt: DateTime) => getBrewiarzPLLink(dt, "m3") }
            }
        },
        vespera: {
            key: "vespera",
            name: "Vespera",
            shortName: "Vespera",
            defaultHour: "18:00",
            link: {
                pl: { href: (dt: DateTime) => getBrewiarzPLLink(dt, "np") }
            }
        },
        completorium: {
            key: "completorium",
            name: "Completorium",
            shortName: "Completorium",
            defaultHour: "21:00",
            link: {
                pl: { href: (dt: DateTime) => getBrewiarzPLLink(dt, "k") }
            }
        }
    }
}

function getBrewiarzPLLink(dt: DateTime, kind: "w" | "gc" | "jt" | "m1" | "m2" | "m3" | "np" | "k") {
    return `https://brewiarz.pl/v_${dt.toFormat("yy")}/${dt.toFormat('ddMM')}/index.php3?link=${kind}`
}