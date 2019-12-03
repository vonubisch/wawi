
$( document ).ready(function() {
    console.log('dd!');


    // repeat with the interval of 2 seconds
    let timerId = setInterval(() => console.log('tick'), 2000);

    // after 5 seconds stop
    setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 5000);

// Handler for .ready() called.
});