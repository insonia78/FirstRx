


const HeaderDesktop = (props) => {


    return (

        <header className="header-desktop-container">
            <div className="header-desktop">                
                <div className="header-desktop-title-container" >
                    FirstRx
                    </div>
                <div className="header-desktop-slogan-container">
                    Find low cash prices for prescriptions
                </div>

                <nav>
                    <div className="header-desktop-about-first-rx-container">
                        About FirstRx
                    </div>
                    <div className="header-desktop-help-container">
                        Help
                    </div>
                    <div className="header-desktop-select-language-label-container">
                        Select Language
                    </div>
                    <select name="language" className="header-desktop-select-language ">
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                    </select>
                </nav> 
                
            </div>
        </header>

    );
};

export default HeaderDesktop;