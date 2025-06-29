
export interface GoogleAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: string;
}

class GoogleAuthService {
  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  }

  async initiateGoogleAuth(): Promise<GoogleAccount> {
    return new Promise((resolve, reject) => {
      if (this.isMobileDevice()) {
        // Mobile/tablet flow - same tab
        this.handleMobileAuth(resolve, reject);
      } else {
        // Desktop flow - new tab
        this.handleDesktopAuth(resolve, reject);
      }
    });
  }

  private handleMobileAuth(resolve: (account: GoogleAccount) => void, reject: (error: string) => void) {
    // Simulate mobile OAuth flow in same tab
    const currentUrl = window.location.href;
    
    // Create a mock Google account selection interface
    const authContainer = document.createElement('div');
    authContainer.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 20px; border-radius: 12px; max-width: 90%; width: 400px;">
          <h3 style="margin: 0 0 20px 0; text-align: center;">Choose a Google Account</h3>
          <div id="google-accounts" style="space-y: 10px;">
            <div class="google-account" data-account="1" style="display: flex; align-items: center; padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; margin-bottom: 10px;">
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=4285f4&color=fff" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px;">
              <div>
                <div style="font-weight: 500;">John Doe</div>
                <div style="font-size: 14px; color: #666;">john.doe@gmail.com</div>
              </div>
            </div>
            <div class="google-account" data-account="2" style="display: flex; align-items: center; padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; margin-bottom: 10px;">
              <img src="https://ui-avatars.com/api/?name=Jane+Smith&background=ea4335&color=fff" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px;">
              <div>
                <div style="font-weight: 500;">Jane Smith</div>
                <div style="font-size: 14px; color: #666;">jane.smith@gmail.com</div>
              </div>
            </div>
            <div class="google-account" data-account="3" style="display: flex; align-items: center; padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; margin-bottom: 10px;">
              <img src="https://ui-avatars.com/api/?name=Mike+Johnson&background=34a853&color=fff" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px;">
              <div>
                <div style="font-weight: 500;">Mike Johnson</div>
                <div style="font-size: 14px; color: #666;">mike.johnson@gmail.com</div>
              </div>
            </div>
          </div>
          <button id="cancel-auth" style="width: 100%; padding: 10px; margin-top: 15px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer;">Cancel</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(authContainer);
    
    // Handle account selection
    const accounts = authContainer.querySelectorAll('.google-account');
    accounts.forEach(account => {
      account.addEventListener('click', () => {
        const accountId = account.getAttribute('data-account');
        const mockAccounts = {
          '1': { id: 'google_1', name: 'John Doe', email: 'john.doe@gmail.com', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4285f4&color=fff', provider: 'google' },
          '2': { id: 'google_2', name: 'Jane Smith', email: 'jane.smith@gmail.com', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=ea4335&color=fff', provider: 'google' },
          '3': { id: 'google_3', name: 'Mike Johnson', email: 'mike.johnson@gmail.com', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=34a853&color=fff', provider: 'google' }
        };
        
        document.body.removeChild(authContainer);
        resolve(mockAccounts[accountId as keyof typeof mockAccounts]);
      });
    });
    
    // Handle cancel
    const cancelButton = authContainer.querySelector('#cancel-auth');
    cancelButton?.addEventListener('click', () => {
      document.body.removeChild(authContainer);
      reject('Authentication cancelled');
    });
  }

  private handleDesktopAuth(resolve: (account: GoogleAccount) => void, reject: (error: string) => void) {
    // Desktop flow - open new tab
    const authWindow = window.open(
      'about:blank',
      'google-auth',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );
    
    if (!authWindow) {
      reject('Popup blocked');
      return;
    }
    
    // Create mock Google OAuth interface in new tab
    authWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sign in with Google</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 400px; margin: 50px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .google-logo { text-align: center; margin-bottom: 20px; font-size: 24px; color: #4285f4; }
          .account { display: flex; align-items: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; margin-bottom: 10px; transition: background 0.2s; }
          .account:hover { background: #f8f9fa; }
          .avatar { width: 40px; height: 40px; border-radius: 50%; margin-right: 15px; }
          .info { flex: 1; }
          .name { font-weight: 500; margin-bottom: 4px; }
          .email { font-size: 14px; color: #666; }
          .cancel { width: 100%; padding: 12px; margin-top: 15px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="google-logo">🔐 Sign in with Google</div>
          <h3 style="text-align: center; margin-bottom: 25px;">Choose an account</h3>
          
          <div class="account" onclick="selectAccount('1')">
            <img class="avatar" src="https://ui-avatars.com/api/?name=John+Doe&background=4285f4&color=fff" alt="John Doe">
            <div class="info">
              <div class="name">John Doe</div>
              <div class="email">john.doe@gmail.com</div>
            </div>
          </div>
          
          <div class="account" onclick="selectAccount('2')">
            <img class="avatar" src="https://ui-avatars.com/api/?name=Jane+Smith&background=ea4335&color=fff" alt="Jane Smith">
            <div class="info">
              <div class="name">Jane Smith</div>
              <div class="email">jane.smith@gmail.com</div>
            </div>
          </div>
          
          <div class="account" onclick="selectAccount('3')">
            <img class="avatar" src="https://ui-avatars.com/api/?name=Mike+Johnson&background=34a853&color=fff" alt="Mike Johnson">
            <div class="info">
              <div class="name">Mike Johnson</div>
              <div class="email">mike.johnson@gmail.com</div>
            </div>
          </div>
          
          <button class="cancel" onclick="window.close()">Cancel</button>
        </div>
        
        <script>
          function selectAccount(accountId) {
            const accounts = {
              '1': { id: 'google_1', name: 'John Doe', email: 'john.doe@gmail.com', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4285f4&color=fff', provider: 'google' },
              '2': { id: 'google_2', name: 'Jane Smith', email: 'jane.smith@gmail.com', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=ea4335&color=fff', provider: 'google' },
              '3': { id: 'google_3', name: 'Mike Johnson', email: 'mike.johnson@gmail.com', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=34a853&color=fff', provider: 'google' }
            };
            
            window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', account: accounts[accountId] }, '*');
            window.close();
          }
        </script>
      </body>
      </html>
    `);
    
    // Listen for messages from the auth window
    const messageHandler = (event: MessageEvent) => {
      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        window.removeEventListener('message', messageHandler);
        resolve(event.data.account);
      }
    };
    
    window.addEventListener('message', messageHandler);
    
    // Handle window closed without selection
    const checkClosed = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', messageHandler);
        reject('Authentication cancelled');
      }
    }, 1000);
  }
}

export const googleAuthService = new GoogleAuthService();
