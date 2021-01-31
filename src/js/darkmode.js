document.addEventListener('DOMContentLoaded', dark)

const themeSwitch = document.getElementById('modedark');
function dark (){
    if (localStorage.getItem('theme') === 'dark') {
       themeSwitch.checked = true
       document.querySelector('html').classList.add('dark')
    }

    themeSwitch.addEventListener('change', () => {
        let htmlClasses = document.querySelector('html').classList
    
        if (localStorage.theme === 'dark') {
            htmlClasses.remove('dark')
            themeSwitch.checked = false
            localStorage.removeItem('theme')
        } else {
            htmlClasses.add('dark')
            themeSwitch.checked = true
            localStorage.theme = 'dark'
        }
    });

}