type Message = string
type Title = string
type Id = string

interface Tweet {
  id: Id
  message: Message
}

interface TweetView {
  id: Id
  tweet: Tweet[]
}

function createMainTweet(): TweetView {

  const id = crypto.randomUUID()
  const tweet = createTweet()

  return {
    id,
    tweet: [tweet],
  }
}

function createTweet():Tweet {
  const id = crypto.randomUUID()
  const message = " "

  return {
    id,
    message
  }
}

function renderView(tweetView: TweetView) {
  let view = document.querySelector("#container-" + tweetView.id)

  if(view) {
    view.innerHTML = " "
  }else {
    view = document.createElement("div")
    view.id = "container-" + tweetView.id
    view.classList.add("mainContainer")
    document.querySelector("#tweets")?.append(view)
  }

  for(let i = 0; i < tweetView.tweet.length; i++){
    renderTweet(tweetView, view as HTMLDivElement, tweetView.tweet[i], i === tweetView.tweet.length - 1)
  }
}

function renderTweet(tweetView: TweetView, view: HTMLDivElement, tweet: Tweet, last: boolean) {
  const tweetContainer = document.createElement("div")
  tweetContainer.id = "container-" + tweet.id
  tweetContainer.classList.add("tweetContainer")

  const form = document.createElement("form")
  form.id = "form-" + tweet.id
  tweetContainer.appendChild(form)

  const countContainer = document.createElement("div")
  countContainer.classList.add("countContainer")

  const textarea = document.createElement("textarea")
  textarea.id = "textarea" + tweet.id
  textarea.value = tweet.message
  textarea.maxLength = 250
  countContainer.textContent = textarea.value.length.toString() + "/250"

  const buttonAddMore = document.createElement("button")
  buttonAddMore.classList.add("button", "buttonNew")
  buttonAddMore.value = "Agregar otro Tweet"
  buttonAddMore.append(document.createTextNode("Agregar otro Tweet"))

  //Listeners
  buttonAddMore.addEventListener("click", evt => {
    evt.preventDefault()
    const anotherTweet = createTweet()
    tweetView.tweet.push(anotherTweet)
    renderView(tweetView)
  })

  textarea.addEventListener("input", evt => {
    const value = (evt.target as HTMLTextAreaElement).value
    countContainer.textContent = value.length.toString() + "/250"
    updateTweet(tweetView, tweet, value)
  })

  form.append(textarea, countContainer)

  if(last) {
    form.appendChild(buttonAddMore)
  }

  view.appendChild(tweetContainer)
}

function updateTweet(tweetView: TweetView, tweet: Tweet, value: Message) {
  let ref: Tweet | null = null

  for(let i = 0; i < tweetView.tweet.length; i++){
    const t = tweetView.tweet[i]

    if(t.id === tweet.id){
      ref = t
    }
  }
  if(ref){
    ref.message = value
  }
}

const bNewTweet = document.querySelector("#bNewTweet")!
const tweetContainer = document.querySelector("#tweet")!
const tweetData: TweetView[] = []

bNewTweet.addEventListener("click", evt => {
  evt.preventDefault()
  const newTweetView = createMainTweet()
  renderView(newTweetView)
})