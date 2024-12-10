document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".form-step");
    const progress = document.getElementById("progress");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const submitBtn = document.getElementById("submitBtn");
    let currentStep = 0;

    // Show the current step
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === stepIndex);
        });

        // Update progress bar
        updateProgressBar(stepIndex);

        // Update button visibility
        prevBtn.style.display = stepIndex > 0 ? "inline-block" : "none";
        nextBtn.style.display = stepIndex < steps.length - 1 ? "inline-block" : "none";
        submitBtn.style.display = stepIndex === steps.length - 1 ? "inline-block" : "none";
    }

    // Update the progress bar
    function updateProgressBar(stepIndex) {
        const progressPercentage = ((stepIndex + 1) / steps.length) * 100;
        progress.style.width = `${progressPercentage}%`;
    }

    // Handle Next button click
    nextBtn.addEventListener("click", function () {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });

    // Handle Back button click
    prevBtn.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Handle form submission
    document.getElementById("clientProfileForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect data from all steps
        const clientProfileData = {
            fullName: document.getElementById("fullName").value,
            profilePicture: document.getElementById("profilePicture").files[0],
            email: document.getElementById("email").value,
            location: document.getElementById("location").value || null,
            servicesNeeded: document.getElementById("servicesNeeded").value,
            budget: document.getElementById("budget").value || null,
            timeline: document.getElementById("timeline").value,
            languages: document.getElementById("languages").value || null, // Collect Languages Spoken
            projectDetails: document.getElementById("projectDetails").value || null,
            preferredCriteria: document.getElementById("preferredCriteria").value || null,
            culturalConsiderations: document.getElementById("culturalConsiderations").value || null,
            referenceMaterials: document.getElementById("referenceMaterials").files[0],
            preferredCommunication: document.getElementById("preferredCommunication").value
        };

        // Store data in localStorage (or send to API)
        localStorage.setItem("clientProfile", JSON.stringify(clientProfileData));

        
        window.location.href = "client-dashboard.html";
    });

    showStep(currentStep);
});
