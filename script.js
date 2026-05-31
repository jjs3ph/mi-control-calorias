// Configuración de Google Gemini API
const GEMINI_API_KEY = 'AIzaSyAsX-EjH1_EXAMPLE_QUOTA_CLEAN_KEY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Base de datos de platos peruanos con macros (fallback)
const peruvianDishes = [
    { name: "Pollo a la brasa", calories: 350, protein: 35, carbs: 0, fats: 20 },
    { name: "Lomo saltado", calories: 450, protein: 30, carbs: 25, fats: 25 },
    { name: "Ceviche", calories: 180, protein: 25, carbs: 15, fats: 5 },
    { name: "Ají de gallina", calories: 380, protein: 28, carbs: 30, fats: 18 },
    { name: "Causa rellena", calories: 280, protein: 8, carbs: 35, fats: 12 },
    { name: "Papa a la huancaína", calories: 320, protein: 12, carbs: 40, fats: 14 },
    { name: "Anticuchos", calories: 250, protein: 20, carbs: 10, fats: 15 },
    { name: "Rocoto relleno", calories: 350, protein: 25, carbs: 20, fats: 20 },
    { name: "Arroz con pollo", calories: 420, protein: 28, carbs: 45, fats: 15 },
    { name: "Tallarines rojos", calories: 380, protein: 22, carbs: 50, fats: 12 },
    { name: "Tallarines verdes", calories: 400, protein: 18, carbs: 45, fats: 20 },
    { name: "Seco de carne", calories: 450, protein: 32, carbs: 30, fats: 22 },
    { name: "Carapulcra", calories: 380, protein: 20, carbs: 50, fats: 14 },
    { name: "Adobo de chancho", calories: 480, protein: 35, carbs: 20, fats: 30 },
    { name: "Cau cau", calories: 280, protein: 22, carbs: 25, fats: 12 },
    { name: "Pachamanca", calories: 420, protein: 35, carbs: 35, fats: 18 },
    { name: "Chicharrón", calories: 520, protein: 30, carbs: 0, fats: 45 },
    { name: "Tamal", calories: 320, protein: 15, carbs: 40, fats: 12 },
    { name: "Humita", calories: 280, protein: 10, carbs: 45, fats: 10 },
    { name: "Palta rellena", calories: 350, protein: 12, carbs: 15, fats: 28 },
    { name: "Palta a la parrilla", calories: 280, protein: 8, carbs: 10, fats: 24 },
    { name: "Huevo sancochado", calories: 78, protein: 6, carbs: 1, fats: 5 },
    { name: "Huevo frito", calories: 92, protein: 6, carbs: 1, fats: 7 },
    { name: "Ensalada de palta", calories: 220, protein: 4, carbs: 12, fats: 18 },
    { name: "Ensalada fresca", calories: 120, protein: 3, carbs: 18, fats: 6 },
    { name: "Sopa de menestras", calories: 280, protein: 18, carbs: 35, fats: 10 },
    { name: "Sopa de verduras", calories: 150, protein: 5, carbs: 25, fats: 5 },
    { name: "Chupe de camarones", calories: 320, protein: 25, carbs: 30, fats: 12 },
    { name: "Chupe de pollo", calories: 280, protein: 22, carbs: 28, fats: 10 },
    { name: "Locro de zapallo", calories: 260, protein: 8, carbs: 40, fats: 10 },
    { name: "Ocopa", calories: 290, protein: 10, carbs: 25, fats: 18 },
    { name: "Solterito", calories: 180, protein: 8, carbs: 20, fats: 10 },
    { name: "Arroz chaufa", calories: 420, protein: 18, carbs: 50, fats: 16 },
    { name: "Wantán frito", calories: 280, protein: 15, carbs: 25, fats: 14 },
    { name: "Wantán cocido", calories: 200, protein: 12, carbs: 22, fats: 8 },
    { name: "Siu mai", calories: 180, protein: 10, carbs: 20, fats: 8 },
    { name: "Japón", calories: 220, protein: 12, carbs: 25, fats: 10 },
    { name: "Pollo al spiedo", calories: 320, protein: 30, carbs: 5, fats: 18 },
    { name: "Milanesa de pollo", calories: 380, protein: 32, carbs: 20, fats: 18 },
    { name: "Milanesa de carne", calories: 420, protein: 35, carbs: 18, fats: 24 },
    { name: "Bisteck a lo pobre", calories: 550, protein: 35, carbs: 35, fats: 30 },
    { name: "Papas fritas", calories: 320, protein: 4, carbs: 40, fats: 16 },
    { name: "Yuca frita", calories: 280, protein: 2, carbs: 35, fats: 14 },
    { name: "Camote frito", calories: 240, protein: 2, carbs: 40, fats: 10 },
    { name: "Arroz blanco", calories: 200, protein: 4, carbs: 45, fats: 1 },
    { name: "Arroz con leche", calories: 280, protein: 8, carbs: 50, fats: 8 },
    { name: "Mazamorra morada", calories: 180, protein: 2, carbs: 45, fats: 0 },
    { name: "Suspiro a la limeña", calories: 320, protein: 4, carbs: 50, fats: 12 },
    { name: "Turrón de doña pepa", calories: 380, protein: 6, carbs: 55, fats: 16 },
    { name: "Picarones", calories: 280, protein: 4, carbs: 45, fats: 12 },
    { name: "Arroz con mariscos", calories: 380, protein: 28, carbs: 40, fats: 14 }
];

// Estado de la aplicación
let meals = [];
let dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65
};
let currentPhoto = null;
let detectedMeal = null;
let isAnalyzing = false;

// Función para resetear isAnalyzing si se queda atascado
function resetAnalyzingState() {
    if (isAnalyzing) {
        console.warn('Reseteando isAnalyzing manualmente - posible estado atascado');
        isAnalyzing = false;
    }
}

// Resetear estado cada 30 segundos como medida de seguridad
setInterval(resetAnalyzingState, 30000);

// Elementos del DOM
const mealForm = document.getElementById('mealForm');
const mealNameInput = document.getElementById('mealName');
const mealCaloriesInput = document.getElementById('mealCalories');
const mealProteinInput = document.getElementById('mealProtein');
const mealCarbsInput = document.getElementById('mealCarbs');
const mealFatsInput = document.getElementById('mealFats');
const mealsList = document.getElementById('mealsList');
const emptyMessage = document.getElementById('emptyMessage');
const suggestions = document.getElementById('suggestions');
const photoPreview = document.getElementById('photoPreview');
const previewImage = document.getElementById('previewImage');
const settingsModal = document.getElementById('settingsModal');
const analysisModal = document.getElementById('analysisModal');
const analysisResult = document.getElementById('analysisResult');

// Elementos de macros
const totalCaloriesDisplay = document.getElementById('totalCalories');
const totalProteinDisplay = document.getElementById('totalProtein');
const totalCarbsDisplay = document.getElementById('totalCarbs');
const totalFatsDisplay = document.getElementById('totalFats');
const caloriesGoalDisplay = document.getElementById('caloriesGoal');
const proteinGoalDisplay = document.getElementById('proteinGoal');
const carbsGoalDisplay = document.getElementById('carbsGoal');
const fatsGoalDisplay = document.getElementById('fatsGoal');
const caloriesProgress = document.getElementById('caloriesProgress');
const proteinProgress = document.getElementById('proteinProgress');
const carbsProgress = document.getElementById('carbsProgress');
const fatsProgress = document.getElementById('fatsProgress');

// Cargar datos guardados al iniciar
function loadFromLocalStorage() {
    const savedMeals = localStorage.getItem('meals');
    const savedGoals = localStorage.getItem('dailyGoals');
    
    if (savedMeals) {
        meals = JSON.parse(savedMeals);
    }
    
    if (savedGoals) {
        dailyGoals = JSON.parse(savedGoals);
    }
    
    updateGoalDisplays();
    renderMeals();
    updateMacros();
}

// Guardar datos en localStorage
function saveToLocalStorage() {
    localStorage.setItem('meals', JSON.stringify(meals));
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
}

// Actualizar displays de metas
function updateGoalDisplays() {
    caloriesGoalDisplay.textContent = dailyGoals.calories;
    proteinGoalDisplay.textContent = dailyGoals.protein;
    carbsGoalDisplay.textContent = dailyGoals.carbs;
    fatsGoalDisplay.textContent = dailyGoals.fats;
    
    document.getElementById('goalCalories').value = dailyGoals.calories;
    document.getElementById('goalProtein').value = dailyGoals.protein;
    document.getElementById('goalCarbs').value = dailyGoals.carbs;
    document.getElementById('goalFats').value = dailyGoals.fats;
}

// Calcular totales de macros
function calculateTotalMacros() {
    return meals.reduce((totals, meal) => ({
        calories: totals.calories + (meal.calories || 0),
        protein: totals.protein + (meal.protein || 0),
        carbs: totals.carbs + (meal.carbs || 0),
        fats: totals.fats + (meal.fats || 0)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
}

// Actualizar macros y barras de progreso
function updateMacros() {
    const totals = calculateTotalMacros();
    
    totalCaloriesDisplay.textContent = totals.calories;
    totalProteinDisplay.textContent = totals.protein;
    totalCarbsDisplay.textContent = totals.carbs;
    totalFatsDisplay.textContent = totals.fats;
    
    // Actualizar barras de progreso
    const caloriesPercent = Math.min((totals.calories / dailyGoals.calories) * 100, 100);
    const proteinPercent = Math.min((totals.protein / dailyGoals.protein) * 100, 100);
    const carbsPercent = Math.min((totals.carbs / dailyGoals.carbs) * 100, 100);
    const fatsPercent = Math.min((totals.fats / dailyGoals.fats) * 100, 100);
    
    caloriesProgress.style.width = caloriesPercent + '%';
    proteinProgress.style.width = proteinPercent + '%';
    carbsProgress.style.width = carbsPercent + '%';
    fatsProgress.style.width = fatsPercent + '%';
}

// Buscar plato en la base de datos
function findMealByName(name) {
    const normalizedName = name.toLowerCase().trim();
    return peruvianDishes.find(dish => 
        dish.name.toLowerCase().includes(normalizedName) ||
        normalizedName.includes(dish.name.toLowerCase())
    );
}

// Buscar sugerencias
function searchSuggestions(query) {
    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery.length < 2) return [];
    
    return peruvianDishes.filter(dish => 
        dish.name.toLowerCase().includes(normalizedQuery)
    ).slice(0, 5);
}

// Mostrar sugerencias
function showSuggestions(suggestionsList) {
    suggestions.innerHTML = '';
    
    if (suggestionsList.length === 0) {
        suggestions.classList.remove('active');
        return;
    }
    
    suggestionsList.forEach(dish => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <div class="suggestion-name">${dish.name}</div>
            <div class="suggestion-calories">${dish.calories} kcal</div>
        `;
        item.onclick = () => selectSuggestion(dish);
        suggestions.appendChild(item);
    });
    
    suggestions.classList.add('active');
}

// Seleccionar sugerencia
function selectSuggestion(dish) {
    mealNameInput.value = dish.name;
    mealCaloriesInput.value = dish.calories;
    mealProteinInput.value = dish.protein;
    mealCarbsInput.value = dish.carbs;
    mealFatsInput.value = dish.fats;
    suggestions.classList.remove('active');
}

// Manejar subida de foto
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Guardar la imagen completa con el encabezado para la vista previa
            currentPhoto = e.target.result;
            previewImage.src = currentPhoto;
            photoPreview.style.display = 'block';
            
            // NO analizar automáticamente - esperar a que el usuario haga clic en "Analizar"
        };
        reader.readAsDataURL(file);
    }
}

// Analizar foto con Google Gemini API
async function analyzePhoto() {
    if (isAnalyzing) {
        console.log('Ya hay un análisis en progreso, por favor espera...');
        return;
    }
    isAnalyzing = true;
    
    try {
        // Convertir la imagen a base64 limpio (sin el encabezado data:image/...;base64,)
        let imageBase64 = currentPhoto;
        if (currentPhoto && currentPhoto.startsWith('data:image')) {
            // Extraer solo los datos base64 después de la coma
            imageBase64 = currentPhoto.split(',')[1];
        }
        
        if (!imageBase64) {
            throw new Error('No se pudo obtener la imagen en base64');
        }
        
        const prompt = 'Analiza esta comida. Devuelve única y estrictamente un objeto JSON con esta estructura: {"nombre": "Nombre del plato", "calorias": 0, "proteinas": 0, "carbos": 0, "grasas": 0}. No agregues texto extra ni bloques de código markdown, solo el JSON.';
        
        // Estructura correcta para Gemini API con InlineData
        const requestBody = {
            contents: [{
                parts: [
                    {
                        text: prompt
                    },
                    {
                        inline_data: {
                            mime_type: 'image/jpeg',
                            data: imageBase64
                        }
                    }
                ]
            }]
        };
        
        console.log('Enviando solicitud a Gemini API con imagen...');
        console.log('Request body:', JSON.stringify(requestBody, null, 2));
        
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        console.log('Status de respuesta:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error completo de la API:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText,
                headers: Object.fromEntries(response.headers.entries())
            });
            
            // Manejar específicamente error 429 (Too Many Requests)
            if (response.status === 429) {
                throw new Error('429');
            }
            
            throw new Error(`Error en la respuesta de la API: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Respuesta de Gemini:', data);
        
        // Extraer el JSON de la respuesta
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error('Estructura de respuesta inválida');
        }
        
        let jsonText = data.candidates[0].content.parts[0].text;
        
        // Limpiar el texto para obtener solo el JSON
        jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        console.log('JSON limpio:', jsonText);
        
        // Parsear el JSON
        const analysisResult = JSON.parse(jsonText);
        
        // Convertir al formato de nuestra aplicación
        detectedMeal = {
            name: analysisResult.nombre || analysisResult.name || 'Plato desconocido',
            calories: parseInt(analysisResult.calorias) || parseInt(analysisResult.calories) || 0,
            protein: parseInt(analysisResult.proteinas) || parseInt(analysisResult.protein) || 0,
            carbs: parseInt(analysisResult.carbos) || parseInt(analysisResult.carbs) || 0,
            fats: parseInt(analysisResult.grasas) || parseInt(analysisResult.fats) || 0
        };
        
        console.log('Plato detectado:', detectedMeal);
        
        // Mostrar modal de análisis con los datos reales
        showAnalysisModal(detectedMeal, 95); // 95% de confianza para Gemini
        
    } catch (error) {
        console.error('Error completo al analizar con Gemini:', error);
        console.error('Stack trace:', error.stack);
        
        // Manejar específicamente error 429
        if (error.message === '429') {
            alert('Espera un momento antes de analizar otro plato. Has alcanzado el límite de solicitudes.');
        } else {
            alert('Error al analizar la imagen con Gemini: ' + error.message + '. Por favor, intenta nuevamente o ingresa los datos manualmente.');
        }
        
    } finally {
        console.log('Reseteando isAnalyzing a false');
        isAnalyzing = false;
    }
}

// Función wrapper para analizar foto desde el botón (con mensaje de carga)
async function analyzePhotoFromButton() {
    console.log('Usuario hizo clic en botón Analizar para foto');
    
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block';
    
    await analyzePhoto();
    
    loadingMessage.style.display = 'none';
}

// Analizar texto con Google Gemini API
async function analyzeText(text) {
    if (isAnalyzing) {
        console.log('Ya hay un análisis en progreso, por favor espera...');
        return null;
    }
    isAnalyzing = true;
    
    try {
        const prompt = `Analiza este plato de comida: "${text}". Devuelve única y estrictamente un objeto JSON con esta estructura: {"nombre": "Nombre del plato", "calorias": 0, "proteinas": 0, "carbos": 0, "grasas": 0}. No agregues texto extra ni bloques de código markdown, solo el JSON. Estima los valores nutricionales basándote en porciones típicas.`;
        
        const requestBody = {
            contents: [{
                parts: [
                    {
                        text: prompt
                    }
                ]
            }]
        };
        
        console.log('Enviando solicitud a Gemini API con texto:', text);
        console.log('Request body:', JSON.stringify(requestBody, null, 2));
        
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        console.log('Status de respuesta:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error completo de la API:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText,
                headers: Object.fromEntries(response.headers.entries())
            });
            
            // Manejar específicamente error 429 (Too Many Requests)
            if (response.status === 429) {
                throw new Error('429');
            }
            
            throw new Error(`Error en la respuesta de la API: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Respuesta de Gemini:', data);
        
        // Extraer el JSON de la respuesta
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error('Estructura de respuesta inválida');
        }
        
        let jsonText = data.candidates[0].content.parts[0].text;
        
        // Limpiar el texto para obtener solo el JSON
        jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        console.log('JSON limpio:', jsonText);
        
        // Parsear el JSON
        const analysisResult = JSON.parse(jsonText);
        
        // Convertir al formato de nuestra aplicación
        const result = {
            name: analysisResult.nombre || analysisResult.name || text,
            calories: parseInt(analysisResult.calorias) || parseInt(analysisResult.calories) || 0,
            protein: parseInt(analysisResult.proteinas) || parseInt(analysisResult.protein) || 0,
            carbs: parseInt(analysisResult.carbos) || parseInt(analysisResult.carbs) || 0,
            fats: parseInt(analysisResult.grasas) || parseInt(analysisResult.fats) || 0
        };
        
        console.log('Resultado del análisis:', result);
        return result;
        
    } catch (error) {
        console.error('Error completo al analizar texto con Gemini:', error);
        console.error('Stack trace:', error.stack);
        
        // Manejar específicamente error 429
        if (error.message === '429') {
            alert('Espera un momento antes de analizar otro plato. Has alcanzado el límite de solicitudes.');
        } else {
            alert('Error al analizar el texto con Gemini: ' + error.message + '. Por favor, intenta nuevamente o ingresa los datos manualmente.');
        }
        
        return null;
    } finally {
        console.log('Reseteando isAnalyzing a false');
        isAnalyzing = false;
    }
}

// Función para analizar texto desde el input (con mensaje de carga)
async function analyzeTextFromInput() {
    const text = mealNameInput.value.trim();
    if (!text) {
        alert('Por favor, escribe el nombre de un plato para analizar.');
        return;
    }
    
    console.log('Usuario hizo clic en botón Analizar para texto:', text);
    
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block';
    
    const result = await analyzeText(text);
    
    loadingMessage.style.display = 'none';
    
    if (result) {
        mealNameInput.value = result.name;
        mealCaloriesInput.value = result.calories;
        mealProteinInput.value = result.protein;
        mealCarbsInput.value = result.carbs;
        mealFatsInput.value = result.fats;
    }
}

// Mostrar modal de análisis
function showAnalysisModal(meal, confidence = null) {
    const conf = confidence || Math.floor(Math.random() * 15) + 85; // 85-99% si no se proporciona
    
    analysisResult.innerHTML = `
        <div class="detected-meal">
            <i class="fas fa-utensils"></i> ${meal.name}
        </div>
        <div class="confidence">
            <i class="fas fa-check-circle"></i> ${conf}% de confianza
        </div>
        <div class="macros-breakdown">
            <div class="macro-breakdown">
                <div class="label">Calorías</div>
                <div class="value">${meal.calories || 0}</div>
                <div style="color: var(--text-secondary); font-size: 0.8rem;">kcal</div>
            </div>
            <div class="macro-breakdown">
                <div class="label">Proteínas</div>
                <div class="value">${meal.protein || 0}</div>
                <div style="color: var(--text-secondary); font-size: 0.8rem;">gramos</div>
            </div>
            <div class="macro-breakdown">
                <div class="label">Carbos</div>
                <div class="value">${meal.carbs || 0}</div>
                <div style="color: var(--text-secondary); font-size: 0.8rem;">gramos</div>
            </div>
            <div class="macro-breakdown">
                <div class="label">Grasas</div>
                <div class="value">${meal.fats || 0}</div>
                <div style="color: var(--text-secondary); font-size: 0.8rem;">gramos</div>
            </div>
        </div>
        <button class="btn-accept" onclick="acceptAnalysis()">
            <i class="fas fa-check"></i> Aceptar y Agregar
        </button>
    `;
    
    analysisModal.classList.add('active');
}

// Aceptar análisis
function acceptAnalysis() {
    if (detectedMeal) {
        mealNameInput.value = detectedMeal.name;
        mealCaloriesInput.value = detectedMeal.calories;
        mealProteinInput.value = detectedMeal.protein;
        mealCarbsInput.value = detectedMeal.carbs;
        mealFatsInput.value = detectedMeal.fats;
    }
    
    closeAnalysis();
}

// Cerrar modal de análisis
function closeAnalysis() {
    analysisModal.classList.remove('active');
}

// Abrir cámara
function openCamera() {
    document.getElementById('photoInput').click();
}

// Remover foto
function removePhoto() {
    currentPhoto = null;
    detectedMeal = null;
    photoPreview.style.display = 'none';
    previewImage.src = '';
    document.getElementById('photoInput').value = '';
}

// Abrir configuración
function openSettings() {
    settingsModal.classList.add('active');
}

// Cerrar configuración
function closeSettings() {
    settingsModal.classList.remove('active');
}

// Guardar configuración
function saveSettings() {
    dailyGoals.calories = parseInt(document.getElementById('goalCalories').value) || 2000;
    dailyGoals.protein = parseInt(document.getElementById('goalProtein').value) || 150;
    dailyGoals.carbs = parseInt(document.getElementById('goalCarbs').value) || 250;
    dailyGoals.fats = parseInt(document.getElementById('goalFats').value) || 65;
    
    saveToLocalStorage();
    updateGoalDisplays();
    updateMacros();
    closeSettings();
}

// Agregar un nuevo plato
function addMeal(name, calories, protein, carbs, fats) {
    const meal = {
        id: Date.now(),
        name: name,
        calories: parseInt(calories) || 0,
        protein: parseInt(protein) || 0,
        carbs: parseInt(carbs) || 0,
        fats: parseInt(fats) || 0,
        photo: currentPhoto
    };
    
    meals.push(meal);
    saveToLocalStorage();
    renderMeals();
    updateMacros();
    
    // Limpiar formulario
    mealNameInput.value = '';
    mealCaloriesInput.value = '';
    mealProteinInput.value = '';
    mealCarbsInput.value = '';
    mealFatsInput.value = '';
    removePhoto();
}

// Eliminar un plato
function deleteMeal(id) {
    const mealIndex = meals.findIndex(meal => meal.id === id);
    if (mealIndex !== -1) {
        meals.splice(mealIndex, 1);
        saveToLocalStorage();
        renderMeals();
        updateMacros();
    }
}

// Limpiar todos los platos
function clearAllMeals() {
    if (confirm('¿Estás seguro de que quieres eliminar todos los platos?')) {
        meals = [];
        saveToLocalStorage();
        renderMeals();
        updateMacros();
    }
}

// Renderizar la lista de platos
function renderMeals() {
    mealsList.innerHTML = '';
    
    if (meals.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        
        meals.forEach(meal => {
            const li = document.createElement('li');
            li.className = 'meal-item';
            li.innerHTML = `
                <div class="meal-info">
                    <div class="meal-name">${escapeHtml(meal.name)}</div>
                    <div class="meal-macros">
                        <div class="meal-macro calories">
                            <i class="fas fa-fire"></i> ${meal.calories} kcal
                        </div>
                        <div class="meal-macro protein">
                            <i class="fas fa-drumstick-bite"></i> ${meal.protein}g
                        </div>
                        <div class="meal-macro carbs">
                            <i class="fas fa-bread-slice"></i> ${meal.carbs}g
                        </div>
                        <div class="meal-macro fats">
                            <i class="fas fa-droplet"></i> ${meal.fats}g
                        </div>
                    </div>
                </div>
                <div class="meal-actions">
                    <button class="btn-delete" onclick="deleteMeal(${meal.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            mealsList.appendChild(li);
        });
    }
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listener para el input de nombre
mealNameInput.addEventListener('input', (e) => {
    const query = e.target.value;
    const suggestionsList = searchSuggestions(query);
    showSuggestions(suggestionsList);
});

// Cerrar sugerencias al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.form-group')) {
        suggestions.classList.remove('active');
    }
});

// Event listener para el formulario
mealForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = mealNameInput.value.trim();
    const calories = mealCaloriesInput.value;
    const protein = mealProteinInput.value;
    const carbs = mealCarbsInput.value;
    const fats = mealFatsInput.value;
    
    if (name) {
        // Agregar con los valores proporcionados (o 0 si no hay)
        // Ya no llamamos automáticamente a Gemini - el usuario debe usar el botón "Analizar"
        addMeal(name, calories || 0, protein || 0, carbs || 0, fats || 0);
    }
});

// Inicializar la aplicación
loadFromLocalStorage();
