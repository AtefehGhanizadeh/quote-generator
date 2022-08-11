
const container=document.querySelector(".container")

const newQuoteBtn=document.querySelector(".new-quote")

const twitterBtn=document.querySelector(".twitter-button")

const quoteText=document.querySelector(".quote")

const authorText=document.querySelector(".author")

const loader=document.querySelector(".loader")

let quoteArray=[]

let selectedQuote=""

// let err=0


function showLoadingSpinner(){

    loader.hidden=false;

    container.style.display="none";
}

function removeLoadingSpinner(){

    loader.hidden=true;

    container.style.display="flex";
}


function selectQuoteFromArray(){

    selectedQuote= quoteArray[Math.floor(Math.random() * quoteArray.length)]

}



function showSelectedQuote(){

    if(selectedQuote.text.length > 50){

        quoteText.classList.add("long-quote")

    }
    else{
        quoteText.classList.remove("long-quote")
    }
    quoteText.textContent=selectedQuote.text

    if(!selectedQuote.author){

        authorText.textContent="Unknown"

    }

    else{
        authorText.textContent=selectedQuote.author
    }

}



function generateQuote(){

    showLoadingSpinner()

    selectQuoteFromArray()

    showSelectedQuote()

    removeLoadingSpinner()

}


async function getQuoteArrayFromApi(){

    showLoadingSpinner()


    await axios.get("https://type.fit/api/quotes").then(res=>{

        quoteArray=res.data

        generateQuote()

        // Error Test Part

        // if(err<9){

        // generateQuote()

        //      throw new Error("oops")

        // }

        // else{
        
        //     throw new Error("oops")
        // }
    

    })
    
    .catch(error=>{

        getQuoteArrayFromApi()

        // Error Test Part

        // if(err<9){

        //     getQuote()

        //     err++

        //     console.log(err)
        // }

        // else{
        //      alert("We are sorry it looks like there is a problem")
        // }


    })

}


getQuoteArrayFromApi()


//Tweet Quote


function tweetQuote(){

    const twitterUrl=`https://twitter.com/internet/tweet?text=${quote.textContent}-${author.textContent}`

    window.open(twitterUrl, '_blank')
}

// tweetBtn


twitterBtn.addEventListener("click" , ()=>{

    tweetQuote()
})

// newQuoteBtn 


newQuoteBtn.addEventListener("click" , ()=>{

    generateQuote()

})

