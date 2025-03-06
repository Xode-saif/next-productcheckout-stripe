import { Nav, NavLink } from "@/components/Nav";

//force to not cache 
export const dynamic = "force-dynamic"
export default function HomeLayout({children}:Readonly<{children:React.ReactNode}>){
    return(
        <>
            <Nav>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/products">Products</NavLink>
                <NavLink href="/orders">Orders</NavLink>
                <NavLink href="/admin">Admin</NavLink>
            </Nav>
            <div className="container my-6 mx-5">{children}</div>
        </>
    )
}