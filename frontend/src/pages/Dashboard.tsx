import { HeaderTop, NavBar } from '@/components';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

declare const HSSideNav: any


export const Dashboard = () => {
    useEffect(() => {
        document.title = 'Dashboard - Mi Aplicación';
        new HSSideNav('.js-navbar-vertical-aside').init()

        

      }, []);
    return (
    <main className="has-navbar-vertical-aside navbar-vertical-aside-show-xl">
        <HeaderTop />
        <div id="content" role="main" className="main">
            <NavBar />
            <Outlet />
        </div>
    </main>

    )
}