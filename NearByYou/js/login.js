function switchLogin(status) {
    if (status === 'log') {
        $('#loginCard').addClass('scale-out');
        $('#registerCard').removeClass('scale-out');
    }else{
        $('#loginCard').removeClass('scale-out');
        $('#registerCard').addClass('scale-out');
    }
}
