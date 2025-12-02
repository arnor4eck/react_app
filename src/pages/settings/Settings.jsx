import './Settings.css'

export default function Settings({savedBackground, setSavedBackground}) {

    return (
        <div className="settings">
            <h3>Настройки темы</h3>
            <div className="setting-group">
                <input
                    type="color"
                    value={savedBackground}
                    onChange={(e) => setSavedBackground(e.target.value)}
                    className="color-input"
                />
            </div>

            <div className="preview" style={{ backgroundColor: savedBackground }}>
                Предпросмотр фона
            </div>
        </div>
    );
}