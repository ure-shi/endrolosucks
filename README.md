# EndroloSucks
A javascript code which is executed from the debug console within an Edrolo lesson to temporarily reset the questions (previously impossible).

To execute the code, copy and paste the following into the debug console while a lesson is active: 
```
var s = document.createElement('script'); 
s.src = "https://raw.githubusercontent.com/ure-shi/endrolosucks/main/EndroloSucks.min.js";
document.head.appendChild(s);
```
