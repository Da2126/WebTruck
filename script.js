// Function to show the sidebar
function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'flex';
    setTimeout(() => {
        sidebar.style.transform = 'translateX(0)';
    }, 10);
}

// Function to close the sidebar
function closeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.transform = 'translateX(100%)';
    setTimeout(() => {
        sidebar.style.display = 'none';
    }, 300);
}

// Function to toggle dropdown visibility
function toggleDropdown(event, dropdownId) {
    event.stopPropagation();
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// Close dropdowns if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.items img')) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
};

// Function to toggle dropdown visibility (for both header and sidebar)
function toggleDropdown(event, dropdownId) {
    event.stopPropagation();  // Prevents the click event from bubbling up and triggering the global click handler
    const dropdown = document.getElementById(dropdownId);
    
    // Toggle the 'show' class which controls the visibility of the dropdown
    dropdown.classList.toggle('show');
}

// Close dropdowns if clicked outside (this works for both header and sidebar)
window.onclick = function(event) {
    if (!event.target.matches('.items img') && !event.target.matches('.dropdown')) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');  // Hide the dropdown
        });
    }
};


// Contact form submission handling
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone_number: document.getElementById('phone_number').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        console.log(formData);  // Log the data being sent

        axios.post('http://localhost:3000/submit-contact', formData)
            .then(response => {
                console.log('Success:', response.data);
                document.getElementById('responseMessage').textContent = response.data.message;
                document.getElementById('contactForm').reset();  // Reset form after submission
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('responseMessage').textContent = "There was an error submitting your form.";
            });
    });
});

// Function to fetch the total count of trucks
async function fetchTotalTruckCount() {
    try {
        const response = await fetch('http://localhost:3000/trucks/count');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('truckCount').innerText = data.count || 0;  // Ensure count is displayed
    } catch (error) {
        console.error('Error fetching total truck count:', error);
        document.getElementById('truckCount').innerText = "Truck not found";  // Updated message
    }
}

// Function to fetch the count of available trucks (status = 0)
async function fetchAvailableTruckCount() {
    try {
        const response = await fetch('http://localhost:3000/trucks/available/count');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        document.querySelector('.Availablee').innerText = data.count || 0; // Update the count in the HTML
    } catch (error) {
        console.error('Error fetching available truck count:', error);
        document.querySelector('.Availablee').innerText = "Truck not found";  // Updated message
    }
}

// Function to fetch the count of trucks in transit (status = 1)
async function fetchTrucksInTransitCount() {
    try {
        const response = await fetch('http://localhost:3000/trucks/in-transit/count');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        document.querySelector('.Transitt').innerText = data.count || 0; // Update the count in the HTML for trucks in transit
    } catch (error) {
        console.error('Error fetching trucks in transit count:', error);
        document.querySelector('.Transitt').innerText = "Truck not found";  // Updated message
    }
}

// Call all functions on page load
window.onload = function() {
    fetchTotalTruckCount();  // Fetch total truck count
    fetchAvailableTruckCount();  // Fetch available truck count
    fetchTrucksInTransitCount();  // Fetch trucks in transit count
};




async function fetchCompleteTaskCount() {
    try {
      const response = await fetch('http://localhost:3000/api/completed-tasks/count');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      updateUI(data.count);
    } catch (error) {
      console.error('Error fetching complete tasks:', error);
    }
  }
  
  function updateUI(count) {
    const completeCountElement = document.querySelector('.Completee');
    if (completeCountElement) {
      completeCountElement.textContent = count;
    }
  }
  
  document.addEventListener('DOMContentLoaded', fetchCompleteTaskCount);
  




 