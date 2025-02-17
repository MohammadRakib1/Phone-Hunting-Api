/**
 * Phone Search
    URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}
    Example: https://openapi.programming-hero.com/api/phones?search=iphone

Phone detail url:
    URL Format: https://openapi.programming-hero.com/api/phone/${id
    Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089
 * **/


const loadPhone = async (searchText = '12', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    // clear container phone card add new card
    phoneContainer.textContent = '';

    //display show-all-button if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        //2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card border-2 lg:m-0 m-4`;
        phoneCard.innerHTML = `
            <figure class="px-6 py-6 m-6 rounded-xl bg-[#0D6EFD0D]">
                <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                    <button onClick="handleShowDetails('${phone.slug}')" class="btn bg-[#0D6EFD] font-bold text-white">Show Details</button>
                </div>
            </div>
        `;
        //append child
        phoneContainer.appendChild(phoneCard);
    })
    //hide loading spinner
    toggleLoadingSpinner(false);
}

//handle show details
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(phone)
    showPhoneDetails(phone);
}

//handle phone details
const showPhoneDetails = (phone) => {
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
        <div class='text-center bg-[#0D6EFD0D] rounded-xl p-4 flex justify-center'>
            <img src="${phone?.image}" alt="">
        </div>
        <div class="mt-10">
            <h3 class="text-2xl font-bold mb-4 text-[#403F3F]">${phone?.name}</h3>
            <p><span class="text-[#403F3F] font-bold">Storage : </span> <span class='text-[#706F6F]'>${phone?.mainFeatures?.storage}</span></p>
            <p><span class="text-[#403F3F] font-bold">Display Size : </span> <span class='text-[#706F6F]'>${phone?.mainFeatures?.displaySize}</span></p>
            <p><span class="text-[#403F3F] font-bold">Chipset : </span> <span class='text-[#706F6F]'>${phone?.mainFeatures?.chipSet}</span></p>
            <p><span class="text-[#403F3F] font-bold">Memory : </span> <span class='text-[#706F6F]'>${phone?.mainFeatures?.memory}</span></p>
            <p><span class="text-[#403F3F] font-bold">Slug : </span> <span class='text-[#706F6F]'>${phone?.slug}</span></p>
            <p><span class="text-[#403F3F] font-bold">Release Date : </span> <span class='text-[#706F6F]'>${phone?.releaseDate}</span></p>
            <p><span class="text-[#403F3F] font-bold">Brand : </span> <span class='text-[#706F6F]'>${phone?.brand}</span></p>
            <p><span class="text-[#403F3F] font-bold">GPS : </span> <span class='text-[#706F6F]'>${phone?.others?.GPS || 'NO GPS'}</span></p>
        </div>

        `

    //show the modal
    show_details_modal.showModal();
}

//handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

//handle toggle spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all
const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();