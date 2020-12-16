


const Header = (props) => {


    return (
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h3 className="my-0 mr-md-auto font-weight-bold">FirstRx</h3>
                    <nav className="my-2 my-md-1 mr-md-1" style={{ width: '35%' }}>
                        <select name="age" className="browser-default custom-select" style={{ width: '100%' }}>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;