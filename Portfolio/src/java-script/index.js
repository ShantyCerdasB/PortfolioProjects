document.addEventListener('DOMContentLoaded', function () {
    // Contact form submission handling
    document.getElementById('contact-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        // Get form input values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            // Sending the form data to the server via fetch API
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    message,
                    recipient: 'scerdasb@ucenfotec.ac.cr',
                }),
            });

            // Handle successful response
            if (response.ok) {
                const popup = document.getElementById('success-popup');
                popup.style.display = 'block';
                document.getElementById('contact-form').reset();

                // Close the popup when clicking the close button
                document.getElementById('close-popup').addEventListener('click', function () {
                    popup.style.display = 'none';
                });
            } else {
                alert('Failed to send the message. Please try again later.');
            }
        } catch (error) {
            // Handle any errors that occur during the fetch request
            alert('An error occurred. Please try again later.');
        }
    });

    // Carousel functionality
    let currentIndex = 0;

    // Function to handle slide transitions
    function moveSlide(direction) {
        const slides = document.querySelectorAll('.proyects .project');
        const totalSlides = slides.length;

        // Update the current index based on the direction
        currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
        const newTransform = -currentIndex * 100;

        // Apply the transform to move the carousel
        document.querySelector('.proyects').style.transform = `translateX(${newTransform}%)`;
    }

    // Event listeners for navigation arrows
    document.querySelector('.carousel-arrow.prev').addEventListener('click', function () {
        moveSlide(-1);
    });
    document.querySelector('.carousel-arrow.next').addEventListener('click', function () {
        moveSlide(1);
    });
});
