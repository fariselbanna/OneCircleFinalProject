document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".form-step");
    const progress = document.getElementById("progress");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const submitBtn = document.getElementById("submitBtn");
    let currentStep = 0;



    
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === stepIndex);
        });

        
        updateProgressBar(stepIndex);

        
        prevBtn.style.display = stepIndex > 0 ? "inline-block" : "none";
        nextBtn.style.display = stepIndex < steps.length - 1 ? "inline-block" : "none";
        submitBtn.style.display = stepIndex === steps.length - 1 ? "inline-block" : "none";
    }

    
    function updateProgressBar(stepIndex) {
        const progressPercentage = ((stepIndex + 1) / steps.length) * 100;
        progress.style.width = `${progressPercentage}%`;
    }

    
    nextBtn.addEventListener("click", function () {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });

    
    prevBtn.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    
    document.getElementById("profileCreationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        


        const profileData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            profilePicture: document.getElementById("profilePicture").files[0],
            profession: document.getElementById("profession").value,
            location: document.getElementById("location").value || null,
            services: document.getElementById("services").value || null,
            languages: document.getElementById("languages").value || null,
            experience: document.getElementById("experience").value,
            credentials: document.getElementById("credentials").files[0],
            community: document.getElementById("community").value || null,
            values: document.getElementById("values").value || null,
            availability: document.getElementById("availability").value,
            portfolio: document.getElementById("portfolio").files[0],
            communication: document.getElementById("communication").value,
        };

        // Store data in localStorage 
        localStorage.setItem("professionalProfile", JSON.stringify(profileData));

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    });

    
    showStep(currentStep);
});
