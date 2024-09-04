const VIEW_ROUTES = Object.freeze({
    HOME: "home",
    DESIGN: "design",
    EXPORT: "export",
});

const HTML_BODY = document.getElementById("body")

export const ROUTER_CONTEXT = {
    route: VIEW_ROUTES.DESIGN,
    props: {},
    navigate: (route, props = {}) => {
        this.route = route
        this.props = props
        Router()
    }
}

function Router() {
    let viewElement
    switch(ROUTER_CONTEXT.route) {
        case VIEW_ROUTES.HOME:
            viewElement = document.createElement('home-view')
            break
        case VIEW_ROUTES.DESIGN:
            viewElement = document.createElement('design-view')
            break
        case VIEW_ROUTES.EXPORT:
            viewElement = document.createElement('export-view')
            break
        default:
            viewElement = document.createElement('home-view')
            break
    }
    HTML_BODY.innerHTML = ''; // Clear the current view
    HTML_BODY.appendChild(viewElement)
}

Router()