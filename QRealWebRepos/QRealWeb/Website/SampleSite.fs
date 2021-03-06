﻿namespace Website

open System
open System.IO
open System.Web
open System.Net
open NetExtensions
open IntelliFactory.WebSharper.Sitelets

/// The website definition.
module SampleSite =
    open IntelliFactory.Html
    open IntelliFactory.WebSharper

    //let downloadLink = A [HRef @"http:\\localhost\main-debug.apk"] -< [Text "Page 2"]
    
    let walked = ref false
    let asyncServer = HttpListener.Start("http://localhost:12345/", fun ctx -> async {
        ctx.Response.Headers.Add("Access-Control-Allow-Origin", "*")
        ctx.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        use sw = new BinaryWriter(ctx.Response.OutputStream)
        if !walked then
            ctx.Response.SendChunked <- true
            use inputStream = new StreamReader(ctx.Request.InputStream)
            let input = inputStream.ReadToEnd()
            let path = @"C:\Projects\qreal\work"
            let addPath str = Path.Combine(path, str)
            System.IO.File.WriteAllText (addPath "forms.xml", input)
            let cmd = addPath "AndroidGenerator.exe"  + " " + path + " aaa"
            System.Diagnostics.Process.Start("cmd.exe", "/C " + cmd).WaitForExit()
            //let client = new WebClient()
            //client.DownloadStringAsync <| new System.Uri(@"C:\Projects\Movies\Test\a.txt")

            let outputFile = Path.Combine(path, "bin", "main-debug.apk")
            //let server = System.Web.HttpContext.Current.Server
            //System.Web.HttpContext.Current <- ctx.Response
            let response = ctx.Response//System.Web.HttpContext.Current.Response
            //let stream = server.CreateObject "ADODB.Stream"
            let resFile = @"Z:\home\localhost\www\main-debug.apk"
            if System.IO.File.Exists resFile then
                System.IO.File.Delete resFile
            System.IO.File.Move(@"C:\Projects\qreal\work\bin\main-debug.apk", resFile)
            (*
            response.AddHeader("Content-Disposition", "attachment; filename=" + "main-debug.apk")//outputFile)
            response.AddHeader("Content-Type", "application/octet-stream")
            let output = System.IO.File.ReadAllBytes outputFile
            let stream = response.OutputStream
            stream.Write (output, 0, output.Length)
            stream.Flush()
            stream.Close()
            response.Close()
            *)
        walked := not !walked
    })

    let walked2 = ref false
    /// Server for saving xmls
    let asyncSaver = HttpListener.Start("http://localhost:12222/", fun ctx -> async {
        ctx.Response.Headers.Add("Access-Control-Allow-Origin", "*")
        ctx.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        use sw = new BinaryWriter(ctx.Response.OutputStream)
        if !walked2 then
            use inputStream = new StreamReader(ctx.Request.InputStream)
            let input = inputStream.ReadToEnd()
            let num = "0"
            System.IO.File.WriteAllText (@"C:\Projects\qreal\saved\" + num + ".xml", input)
        walked2 := not !walked2
    })

    /// Actions that corresponds to the different pages in the site.
    type Action =
        | Register
        | Home
        | Editor of int
        | AddDiagram
        | Login of option<Action>
        | Logout

    /// A helper function to create a hyperlink
    let private ( => ) title href =
        A [HRef href] -< [Text title]

    /// A helper function to create a 'fresh' url with a random get parameter
    /// in order to make sure that browsers don't show a cached version.
    let private RandomizeUrl url =
        url + "?d=" + System.Uri.EscapeUriString (System.DateTime.Now.ToString())

    /// User-defined widgets.
    module Widgets =

        /// Widget for displaying login status or a link to login.
        let LoginInfo (ctx: Context<Action>) : list<Content.HtmlElement> =
            let user = UserSession.GetLoggedInUser ()
            [
                (
                    match user with
                    | Some email ->
                        "Log Out (" + email + ")" => 
                            (RandomizeUrl <| ctx.Link Action.Logout)
                    | None ->
                        "Login" => (ctx.Link <| Action.Login None)
                )
            ]

        /// Widget for link to register.
        let Register (ctx: Context<Action>) : list<Content.HtmlElement> =
            [
                "Register" => (RandomizeUrl <| ctx.Link Action.Register)
            ]

    module Skin =
        open System.Web

        type Page =
            {
                Login : list<Content.HtmlElement>
                Register : list<Content.HtmlElement>
                Banner : list<Content.HtmlElement>
                Menu : list<Content.HtmlElement>
                Main : list<Content.HtmlElement>
                //Sidebar : list<Content.HtmlElement>
                Footer : list<Content.HtmlElement>
                Title : string
            }

        let MainTemplate =
            let path = HttpContext.Current.Server.MapPath("~/Main.html")
            Content.Template<Page>(path)
                .With("title", fun x -> x.Title)
                .With("login", fun x -> x.Login)
                .With("register", fun x -> x.Register)
                .With("banner", fun x -> x.Banner)
                .With("menu", fun x -> x.Menu)
                .With("main", fun x -> x.Main)
                //.With("sidebar", fun x -> x.Sidebar)
                .With("footer", fun x -> x.Footer)

        let WithTemplate title main : Content<Action> =
            Content.WithTemplate MainTemplate <| fun ctx ->
                let menu : list<Content.HtmlElement> =
                    let ( ! ) x = ctx.Link x
                    [
                        "Home" => !Action.Home
                        "Add movie" => !Action.AddDiagram
                        //"Protected" => (RandomizeUrl <| !Action.Protected)
                    ]
                    |> List.map (fun link ->
                        Label [Class "menu-item"] -< [link])
                {
                    Login = Widgets.LoginInfo ctx
                    Register = Widgets.Register ctx
                    Banner = [H2 [Text title]]
                    Menu = menu
                    Main = main ctx
                    //Sidebar = [Text "Put your side bar here"]
                    Footer = []
                    Title = title
                }

    /// The pages of this website.
    module Pages =

        /// The home page.
        let HomePage : Content<Action> =
            Skin.WithTemplate "Home" <| fun ctx ->
            (*
                DB.selectAll()
                |> Array.map (Array.map (fun x -> TD [Div [string x + "." |> Text]]))
                |> Array.map TR
                |> Table
                |> fun x -> [x]
            *)
            match UserSession.GetLoggedInUser() with
            | None -> []
            | Some user ->
                DB.getDiagrams user
                |> List.ofArray
                |> List.map (fun (name, id) ->
                    name => ctx.Link (Action.Editor id)
                ) |> (fun existing ->
                    ("New diagram" => ctx.Link Action.AddDiagram)::existing
                ) |> List.map (fun x -> LI [x])
                |> fun x -> [UL x]
        let Editor id : Content<Action> = 
            Skin.WithTemplate "Home" <| fun ctx ->
                [IFrame [Src "http://localhost:61082/default.htm"; Width "1000"; Height "600"]]

        /// A simple page that echoes a parameter.
        let AddDiagramPage : Content<Action> =
            Skin.WithTemplate "Echo" <| fun ctx ->
                [
                    H1 [Text "Add diagram"]
                    Div [
                        new AddDiagramControl()]
                ]

        /// A simple login page.
        let LoginPage (redirectAction: option<Action>): Content<Action> =
            Skin.WithTemplate "Login" <| fun ctx ->
                let redirectLink =
                    match redirectAction with
                    | Some action -> action
                    | None        -> Action.Home
                    |> ctx.Link
                [
                    H1 [Text "Login"]
                    Div [
                        new LoginControl(redirectLink)
                    ]
                ]

        /// A simple login page.
        let RegisterPage : Content<Action> =
            Skin.WithTemplate "Register" <| fun ctx ->
                [
                    H1 [Text "Register"]
                    Div [
                        new RegisterControl()
                    ]
                ]

    /// The sitelet that corresponds to the entire site.
    let EntireSite =
        // A sitelet for the protected content that requires users to log in first.
        // A simple sitelet for the home page, available at the root of the application.
        let protect =
            let filter : Sitelet.Filter<Action> =
                {
                    VerifyUser = fun _ -> true
                    LoginRedirect = Some >> Action.Login
                }
            Sitelet.Protect filter
        //let home = protect <| Sitelet.Content "/" Action.Home Pages.HomePage
        let authenticated =
            [
                Sitelet.Content "/AddDiagram" Action.AddDiagram Pages.AddDiagramPage
                Sitelet.Content "/" Action.Home Pages.HomePage
            ]
            |> List.map protect
            |> Sitelet.Sum

        // An automatically inferred sitelet created for the basic parts of the application.
        let basic =
            Sitelet.Infer <| fun action ->
                match action with
                | Action.Login action->
                    Pages.LoginPage action
                | Action.Logout ->
                    // Logout user and redirect to home
                    match UserSession.GetLoggedInUser() with
                    | None -> ()
                    | _ -> UserSession.Logout ()
                    Pages.LoginPage None
                | Action.Register ->
                    Pages.RegisterPage
                | Action.Editor id -> Pages.Editor id
                | Action.AddDiagram
                | Action.Home ->
                    Content.ServerError

        // Compose the above sitelets into a larger one.
        [
            //home
            authenticated
            basic
        ]
        |> Sitelet.Sum

/// Expose the main sitelet so that it can be served.
/// This needs an IWebsite type and an assembly level annotation.
type SampleWebsite() =
    interface IWebsite<SampleSite.Action> with
        member this.Sitelet = SampleSite.EntireSite
        member this.Actions = []

[<assembly: WebsiteAttribute(typeof<SampleWebsite>)>]
do ()
