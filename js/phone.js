const loadPhone = async (searchText='oppo') =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data  = await res.json()
    const phones = data.data
    // console.log(phones)
    displayPhones(phones)
}




const displayPhones = phones => {

  
  
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerText = ''

    const showAllContainer = document.getElementById('show-all-container')
    

    if(phones.length > 6){
      showAllContainer.classList.remove('hidden')
    }

    phones = phones.slice(0, 9)

    // console.log(phones)
    phones.forEach(phone => {
        console.log(phone)

        // create a div
        const phoneCard = document.createElement('div')

        phoneCard.classList = `card bg-gray-200 p-4 shadow-xl`
        phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone. phone_name}</h2>
          <p>${phone.slug}</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `

        phoneContainer.appendChild(phoneCard)
    });


    toggleLoadingSpinner(false)
}






const handleShowDetails = async (id) => {
  console.log(id)

  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data
  showPhoneDetails(phone)
  
}


const showPhoneDetails = (phone) => {
  console.log(phone)

  const phoneName = document.getElementById('show-details-phone-name')
  phoneName.innerText = phone.name


  const showDetailContainer = document.getElementById('show-detail-container')
  showDetailContainer.innerHTML =  `
    <img src="${phone.image}" alt="" />

    <p><span>Storage: <span/>${phone.mainFeatures.storage}</p>
    <p><span>Chipset: <span/>${phone.mainFeatures.chipSet}</p>
    <p><span>Dsiplay size: <span/>${phone.mainFeatures.displaySize}</p>
    <p><span>Brand: <span/>${phone.brand}</p>

  
  `


  show_details_modal.showModal()
}


// handle button
const handleSearch = () =>{
  toggleLoadingSpinner(true)
  const searchField = document.getElementById('search-field')
  searchText = searchField.value
  console.log(searchText)
  loadPhone(searchText)
    
}



// const handleSearch2 = () => {
//   toggleLoadingSpinner(true)
//   const inputSearch = document.getElementById('input-search')
//   const searchText = inputSearch.value
//   // console.log(inputText)
//   loadPhone(searchText)

// }


const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner')
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}


loadPhone()