$(document).ready(() => {
  let url = window.location.href;
	console.log(url.search('header=false'));
  if (url.search('header=false') > 0)
    document.getElementById('header').style.display = 'none'
  if (url.search('navbar=false') > 0)
    document.getElementById('navbarVertical').style.display = 'none'
});
