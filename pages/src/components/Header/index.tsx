


const Header = (props) => {


    return (
        
            <header className="header-container">
                 <div className="header">
                     <div className="header-content">                
                        <div className="header-title-container" >
                            FirstRx                        
                        </div>
                        <div className="header-slogan-container">
                            Find low cash prices for prescriptions
                        </div>
                    </div>
                     <nav>
                        <div className="header-about-first-rx-container">
                            About FirstRx
                        </div> 
                        <div className="header-help-container">
                            Help
                        </div> 
                        <div className="header-select-language-label-container">
                            Select Language
                        </div> 
                        <select name="language" className="header-select-language ">
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </nav>
                </div>          
            </header>
        
    );
};

export default Header;