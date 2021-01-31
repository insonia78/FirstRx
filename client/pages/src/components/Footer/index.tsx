





export default function Footer() {

    return (
        <footer>

            <hr />

            <section>

                <p>&copy; 2021 FirstRx</p>

                <nav className="primary" aria-label="main navigation">
                    <ul>
                        <li className="homelink"><a className="selected" href="/">Home</a></li>
                        <li><a href="/help/">Help</a></li>
                        <li><a href="/about/">About FirstRx</a></li>
                    </ul>
                </nav>

            </section>

        </footer>

    );


}