class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?"{ constraints {
                // apply constraints here
            } }

        "/"(controller:"/pageFramework")
        "500"(view:'/error')
    }
}
