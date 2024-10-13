const itemsPerPage = 20; // Number of items to load per page
let currentPage = 1;
let allData = []; // Store all fetched data

const loadData = async () => {
    try {
        const response = await fetch('./assets/websiteinfo.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        allData = await response.json(); // Save all data for pagination
        displayData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

function displayData() {
    const parentDiv = document.querySelector('#parentDiv');
    let html = '';

    // Calculate the starting and ending index for the current page
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Slice the data to get the current page items
    const pageItems = allData.slice(start, end);

    // Render items for the current page
    pageItems.forEach(el => {
        html += `<div class="flex flex-col gap-1 max-w-sm p-5 bg-white border text-white border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
                    <h4 class="mb-2 text-xl font-extralight tracking-tight">${el.name}</h4>
                    <a href="${el.url}" target="_blank" class="cursor-pointer"> 
                        <h4 class="mb-2 text-base font-semibold tracking-tight text-black bg-white inline pr-5 pl-1 hover:pl-5 ease-in-out duration-200 rounded-[2px]">Visit</h4>
                    </a>
                </div>`;
    });

    // Append the rendered HTML to the parentDiv
    parentDiv.innerHTML += html;

    // Show or hide the "Load More" button based on available items
    const loadMoreButton = document.getElementById('loadMore');
    if (end < allData.length) {
        loadMoreButton.classList.remove('hidden'); // Show button
    } else {
        loadMoreButton.classList.add('hidden'); // Hide button if no more items
    }
}

// Add event listener to "Load More" button
document.getElementById('loadMore').addEventListener('click', () => {
    currentPage++;
    displayData();
});

// Load initial data
loadData();
