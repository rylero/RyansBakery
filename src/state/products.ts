import ChocolateChip from "$lib/assets/products/chocolateChip.jpg";
import NeimanMarcus from "$lib/assets/products/neimanMarcus.jpg";
import PeanutButter from "$lib/assets/products/peanutButter.jpg";
import Snickerdoodle from "$lib/assets/products/snickerdoodle.jpg";
import TigerCookies from "$lib/assets/products/tigerCookies.jpg";

export type Product = {
    id: number,
    name: string,
    img: string,
    description: string,
    price: number,
    unit: string,
}

const cookiesUnit = "per dozen"

export const products: Array<{ name: string, description: string, products: Array<Product> }> = [
    { 
        name: "Cookies",
        description: "Served by the dozen",
        products: [
            { id: 0,   name: "Chocolate Chip",    img: ChocolateChip,  description: "The simple chocolate chip cookie.",  price: 7.99,  unit: cookiesUnit },
            { id: 1,   name: "Neiman Marcus",     img: NeimanMarcus,  description: "Cookies with chocolate chips, hersheys chocolate, and oatmeal",  price: 7.99,  unit: cookiesUnit },
            { id: 2,   name: "Peanut Butter",     img: PeanutButter,  description: "Peanut butter cookies with hershey kisses on top.",  price: 7.99,  unit: cookiesUnit },
            { id: 3,   name: "Snickerdoodle",     img: Snickerdoodle,  description: "Sugar based bookies with a cinammon coating.",  price: 7.99,  unit: cookiesUnit },
            { id: 4,   name: "Tiger Cookies",     img: TigerCookies,  description: "Cookies with frosted flakes and swirled chocolate. <span class='text-red-500'>Disclamer: not made of actual tigers.</span>",  price: 7.99,  unit: cookiesUnit },
        ]
    }
]