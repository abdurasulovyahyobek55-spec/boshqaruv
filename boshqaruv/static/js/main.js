// ─── Phone Input Mask (+998 XX XXX XX XX) ─────────────────────────
document.addEventListener('DOMContentLoaded', function () {

    // ─── Theme Switcher ───────────────────────────────────────────
    const themeBtns = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('boshqaruv-theme') || 'dark';

    function applyTheme(theme) {
        document.body.classList.remove('theme-gradient', 'theme-light');
        if (theme === 'gradient') {
            document.body.classList.add('theme-gradient');
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else if (theme === 'light') {
            document.body.classList.add('theme-light');
            document.documentElement.setAttribute('data-bs-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        }
        themeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
        localStorage.setItem('boshqaruv-theme', theme);
    }

    applyTheme(savedTheme);

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let raw = this.value.replace(/\D/g, '');

            // Always keep 998 prefix
            if (!raw.startsWith('998')) {
                raw = '998' + raw.replace(/^998/, '');
            }

            // Limit to 12 digits (998 + 9 digits)
            raw = raw.substring(0, 12);

            // Format: +998 XX XXX XX XX
            let formatted = '+998';
            if (raw.length > 3) formatted += ' ' + raw.substring(3, 5);
            if (raw.length > 5) formatted += ' ' + raw.substring(5, 8);
            if (raw.length > 8) formatted += ' ' + raw.substring(8, 10);
            if (raw.length > 10) formatted += ' ' + raw.substring(10, 12);

            this.value = formatted;
        });

        // Prevent clearing the +998 prefix
        phoneInput.addEventListener('keydown', function (e) {
            if (this.selectionStart <= 4 && (e.key === 'Backspace' || e.key === 'Delete')) {
                e.preventDefault();
            }
        });

        // Focus handling
        phoneInput.addEventListener('focus', function () {
            if (!this.value || this.value.trim() === '') {
                this.value = '+998 ';
            }
        });
    }

    // ─── Delete Confirmation ──────────────────────────────────────
    document.querySelectorAll('.delete-form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            if (!confirm("Haqiqatan ham o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi!")) {
                e.preventDefault();
            }
        });
    });

    // ─── Auto-dismiss alerts after 5 seconds ──────────────────────
    document.querySelectorAll('.alert').forEach(function (alert) {
        setTimeout(function () {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
            if (bsAlert) bsAlert.close();
        }, 5000);
    });
});
