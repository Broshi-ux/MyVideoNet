const SUPABASE_URL = "https://nnwcwfsgjduipbalwjhi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_cBk88lLLm_T52T8s6kYFag_Qw-iya5T";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const authForm = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const formTitle = document.getElementById('form-title');
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const userDisplay = document.getElementById('user-display');
const logoutBtn = document.getElementById('logout-btn');

let isLoginMode = false;

toggleLink.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        formTitle.innerText = "Log Into MyVideoNet";
        submitBtn.innerText = "Log In";
        toggleText.innerHTML = "New here? <span id='toggle-link'>Create Account</span>";
    } else {
        formTitle.innerText = "Join MyVideoNet";
        submitBtn.innerText = "Create Account";
        toggleText.innerHTML = "Already a member? <span id='toggle-link'>Log In</span>";
    }
    document.getElementById('toggle-link').addEventListener('click', () => toggleLink.click());
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (isLoginMode) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else showDashboard(data.user);
    } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else {
            alert("Success! Welcome to MyVideoNet.");
            showDashboard(data.user);
        }
    }
});

logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    dashboardSection.classList.add('hidden');
    userDisplay.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    authSection.classList.remove('hidden');
    authForm.reset();
});

function showDashboard(user) {
    if (user) {
        userDisplay.innerText = user.email;
        userDisplay.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
        authSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
    }
}