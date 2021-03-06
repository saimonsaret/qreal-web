<div id="diagramContent" class="unselectable" ng-controller="DiagramController">
    <ul class='custom-menu'>
        <li data-action="delete">Delete</li>
    </ul>
    <div class="navbar navbar-inverse navbar-static-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="<c:url value="/"/>">Dashboard</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">File<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="" role="menuitem" tabindex="-1" ng-click="vm.saveDiagram()">Save</a></li>
                            <li><a href="" role="menuitem" tabindex="-1" ng-click="vm.openDiagram()">Open</a></li>
                        </ul>
                    </li>
                    <li>
                        <p class="navbar-text" ng-click="vm.openTwoDModel()">
                            <img src="images/2dmodel/2d-model.svg" style="width: 18px; height: 18px; cursor: pointer"/>
                        </p>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">

                    <sec:authorize access="isAuthenticated()">

                        <li class="dropdown">
                            <a class="dropdown-toggle" role="button" data-toggle="dropdown" href="#"><i
                                    class="glyphicon glyphicon-user"></i>
                                <sec:authentication property="name"/>
                                <span class="caret"></span>
                            </a>
                            <ul id="g-account-menu" class="dropdown-menu" role="menu">
                                <li><a href="#">My Profile</a></li>
                            </ul>
                        </li>
                        <li>
                            <c:url value="/j_spring_security_logout" var="logout"/>
                            <a href="${logout}">
                                <i class="glyphicon glyphicon-lock"></i>
                                Logout
                            </a>
                        </li>
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                    </sec:authorize>
                </ul>

            </div>
        </div>
    </div>

    <div id="diagram_container">
        <div id="diagram_left-menu">
            <legend style="padding: 10px">Property Editor</legend>
            <table class="table table-condensed" id="property_table">
                <thead>
                <tr>
                    <th>Property</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>

        <div id="diagram_paper">
        </div>

        <div id="diagram_right-menu">
            <legend style="height: 40px; padding: 10px">Palette</legend>
            <div id="elements_tree">
                <ul id="navigation">
                </ul>
            </div>
        </div>
    </div>
</div>
