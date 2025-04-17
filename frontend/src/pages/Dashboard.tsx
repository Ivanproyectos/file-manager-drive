import { HeaderTop, NavBar } from '@/components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

declare const HSSideNav: any


export const Dashboard = () => {
    useEffect(() => {
        document.title = 'Dashboard - Grupo qhuya';
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