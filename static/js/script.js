// JavaScript code for handling the image preview and providing recommendations
const leftEyeInput = document.querySelector('#left_eye');
const rightEyeInput = document.querySelector('#right_eye');
const leftEyeImage = document.querySelector('#left-eye-image');
const rightEyeImage = document.querySelector('#right-eye-image');
const predictionResult = document.querySelector('#prediction-result');
const predictButton = document.querySelector('#predict-button');
const recommendationElement = document.querySelector('#recommendation');

leftEyeInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        leftEyeImage.src = URL.createObjectURL(selectedFile);
        leftEyeImage.style.display = 'block';
    } else {
        leftEyeImage.src = '';
        leftEyeImage.style.display = 'none';
    }
});

rightEyeInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        rightEyeImage.src = URL.createObjectURL(selectedFile);
        rightEyeImage.style.display = 'block';
    } else {
        rightEyeImage.src = '';
        rightEyeImage.style.display = 'none';
    }
});

predictButton.addEventListener('click', async () => {
    const leftFormData = new FormData(document.querySelector('#left-eye-form'));
    const rightFormData = new FormData(document.querySelector('#right-eye-form'));

    // Combine both sets of data into one FormData
    const combinedFormData = new FormData();
    combinedFormData.append('left_eye', leftFormData.get('left_eye'));
    combinedFormData.append('right_eye', rightFormData.get('right_eye'));

    // Send combined data to the server for prediction
    const response = await fetch('/predict', {
        method: 'POST',
        body: combinedFormData,
    });

    // Handle the response
    const data = await response.json();
    const predictedSeverity = data.result;
    predictionResult.textContent = `Predicted Severity: ${predictedSeverity}`;

    // Add recommendation based on predicted severity
    let recommendation = '';

    switch (predictedSeverity) {
        case 'No DR':
            recommendation = 'No Diabetic Retinopathy detected. Please consult your doctor regularly.';
            break;
        case 'Mild':
            recommendation = 'Mild Diabetic Retinopathy detected. Monitor your condition and consult your doctor for advice.';
            break;
        case 'Moderate':
            recommendation = 'Moderate Diabetic Retinopathy detected. Consult your doctor for further evaluation.';
            break;
        case 'Severe':
            recommendation = 'Severe Diabetic Retinopathy detected. Urgently consult your doctor for treatment options.';
            break;
        case 'Proliferative':
            recommendation = 'Proliferative Diabetic Retinopathy detected. Immediate medical attention is required.';
            break;
        default:
            recommendation = 'Please consult your doctor for a comprehensive evaluation.';
            break;
    }

    recommendationElement.textContent = recommendation;
});
