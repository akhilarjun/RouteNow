$Router.config([
    { path: 'home', templateUrl: 'partial/home.html' },
    { path: 'options', templateUrl: 'partial/options.html' },
    { path: 'about', templateUrl: 'partial/about.html' },
    { path: 'thankyou', templateUrl: 'partial/thankyou.html' },
    { otherwise: 'home' }
], {
    useHashStrategy: true,
    customErrorPageUrl: 'partial/customError.html',
    beforeRouteChange: (activePath) => {
        console.log('Before Route Change =>', activePath);
    },
    afterRouteChange: (activePath) => {
        console.log('After Route Change =>', activePath);
        ScrollOut();
        if (activePath === 'options') {
            document.querySelectorAll('.drawer-menu').forEach(drawer => {
                drawer.addEventListener('click', (e) => {
                    let el = e.target;
                    let targetToScroll = el.dataset.target;
                    document.querySelectorAll('.drawer-menu').forEach(d => { d.classList = 'drawer-menu' })
                    el.classList = "drawer-menu active";
                    document.getElementById(targetToScroll).scrollIntoView();
                })
            });
        }
    },
    onRouteChangeError: (activePath) => {
        console.log('Route Change Error =>', activePath);
    }
});

document.getElementById('goToGithub').addEventListener('click', () => {
    window.location.href = 'https://github.com/akhilarjun/RouteNow';
})
