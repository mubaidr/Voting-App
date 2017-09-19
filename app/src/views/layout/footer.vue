<template>
    <footer id="myFooter">
        <div class="container">
            <div class="row">
                <div class="col-sm-3">
                    <h5>Get started</h5>
                    <ul>
                        <li>
                            <a href="/home">Home</a>
                        </li>
                        <li>
                            <a href="/login">Login</a>
                        </li>
                        <li>
                            <a href="/register">Register</a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-3">
                    <h5>About</h5>
                    <ul>
                        <li>
                            <a href="https://github.com/mubaidr/Voting-App#voting-app">Service</a>
                        </li>
                        <li>
                            <a href="https://github.com/mubaidr/Voting-App">Source Code</a>
                        </li>

                    </ul>
                </div>
                <div class="col-sm-3">
                    <h5>Support</h5>
                    <ul>
                        <li>
                            <a href="https://github.com/mubaidr/Voting-App/issues">Github Issues</a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-3">
                    <p>Designed and Coded by <br/>
                        <a href="https://mubaidr.github.io">Muhammad Ubaid Raza</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "footer-comp"
    }
</script>

<style>
    #myFooter {
        flex: 0 0 auto;
        -webkit-flex: 0 0 auto;
    }

    #myFooter {
        background-color: #f7f7f7;
        padding: 30px 0;
        border-top: 1px solid #ccc;
    }

    @media screen and (min-height: 760px) {
        #myFooter {
            position: fixed;
            bottom: 0;
            width: 100%;
            padding: 15px 0;
        }
    }

    #myFooter ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    #myFooter h5 {
        margin-top: 0;
    }

    .footer-copyright {
        color: #444;
        margin-top: 10px;
        padding-bottom: 5px;
        margin-right: 20px;
        text-align: left;
    }
</style>

