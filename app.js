document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const walletBtn = document.getElementById('walletBtn');
    const walletStatusText = document.getElementById('walletStatusText');
    const mineToggleBtn = document.getElementById('mineToggleBtn');
    const miningStatusPill = document.getElementById('miningStatusPill');
    const minedBalanceEl = document.getElementById('minedBalance');
    const hashRateEl = document.getElementById('hashRate');
    const copyRefBtn = document.getElementById('copyRefBtn');
    const refLinkInput = document.getElementById('refLinkInput');

    // State
    let isConnected = false;
    let isMining = false;
    let minedBalance = 0.000000;
    let miningInterval = null;

    // Wallet Connection Simulation
    walletBtn.addEventListener('click', () => {
        isConnected = !isConnected;
        
        if (isConnected) {
            walletBtn.classList.add('connected');
            walletBtn.classList.remove('disconnected');
            walletStatusText.textContent = '0x8F3c...91a2';
            mineToggleBtn.removeAttribute('disabled');
        } else {
            walletBtn.classList.remove('connected');
            walletBtn.classList.add('disconnected');
            walletStatusText.textContent = 'Connect Wallet';
            mineToggleBtn.setAttribute('disabled', 'true');
            
            // Stop mining if wallet disconnects
            if (isMining) {
                stopMining();
            }
        }
    });

    // Mining Toggle
    mineToggleBtn.addEventListener('click', () => {
        if (!isConnected) return;

        isMining = !isMining;

        if (isMining) {
            startMining();
        } else {
            stopMining();
        }
    });

    function startMining() {
        isMining = true;
        mineToggleBtn.textContent = 'Stop Mining';
        mineToggleBtn.style.background = '#EF4444'; // red for stop
        mineToggleBtn.style.color = '#FFFFFF';
        miningStatusPill.textContent = 'Active';
        miningStatusPill.classList.add('active');
        miningStatusPill.classList.remove('offline');
        hashRateEl.textContent = '48.5 KH/s';

        miningInterval = setInterval(() => {
            minedBalance += 0.000015;
            minedBalanceEl.textContent = minedBalance.toFixed(6);
            
            // Random minor fluctuation in hashrate for realism
            const fluctuation = (Math.random() * 2 - 1).toFixed(1);
            hashRateEl.textContent = (48.5 + parseFloat(fluctuation)) + ' KH/s';
        }, 1000);
    }

    function stopMining() {
        isMining = false;
        mineToggleBtn.textContent = 'Start Mining';
        mineToggleBtn.style.background = '';
        mineToggleBtn.style.color = '';
        miningStatusPill.textContent = 'Idle';
        miningStatusPill.classList.remove('active');
        miningStatusPill.classList.add('offline');
        hashRateEl.textContent = '0 KH/s';

        if (miningInterval) {
            clearInterval(miningInterval);
            miningInterval = null;
        }
    }

    // Copy Referral Link
    copyRefBtn.addEventListener('click', () => {
        refLinkInput.select();
        refLinkInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            const originalHTML = copyRefBtn.innerHTML;
            copyRefBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyRefBtn.innerHTML = originalHTML;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
});
