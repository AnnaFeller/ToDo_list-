const THEMES = [
    {id:'black',name:'black',value:'#18181BFF'},
    {id:'white',name:'white',value:'rgba(244,244,245,0.93)'},
    {id:'purple',name:'purple',value:'rgba(79,70,229,0.8)'},
    {id:'red',name:'red',value:'#912838'},
]
const ThemePicker = (props) => {
    const {bgTheme,setBgTheme,styles} = props;

    return (
        <div className={styles.themePicker}>
            <span className={styles.themeLabel}>background:</span>
            <div className={styles.colorButtons}>
                {THEMES.map(theme => (
                    <button
                    key={theme.id}
                    type="button"
                    className={`${styles.colorBtn} ${bgTheme === theme.value ? styles.activeTheme : ''}`}
                    style={{ backgroundColor: theme.value }}
                    onClick={() => setBgTheme(theme.value)}
                    title={theme.name}
                   />
                ))}
            </div>
        </div>
    )
}
export default ThemePicker;