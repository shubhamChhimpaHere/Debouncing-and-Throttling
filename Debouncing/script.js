

let search = document.getElementById('search');
let main = document.getElementById('main');

function drawData(arr) {
    let bag = ``;

    arr.forEach(({Title, Poster, Year}) => {
        bag += `
        <div>
        <img src="${Poster}" alt="">
        <h2>${Title}</h2>
        <h3>${Year}</h3>
    </div>
        `;
    });

    main.innerHTML = bag;

}

async function performTask(query) {
   
    let apiKey = `623f2bfb`;
    let url = `https://omdbapi.com/?apikey=${apiKey}&s=${query || 'all'}`;

    try {
        let res = await fetch(url);
        let data = await res.json();

        drawData(data.Search);
        
        
    } catch (error) {
    
        main.innerHTML = `<h2 style="background: black"> 404 not found</h2>`
    }

    
}

performTask()


function debounce(func, delay) {
    let timer; 
    function inner(query) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(query.trim());
        }, delay)
    }

    return inner;
}

let debounceOut = debounce(performTask, 500);

search.addEventListener('input', () => {
    debounceOut(search.value);
})