import requests
import time
import sys

def check_service(name, url, timeout=5):
    try:
        response = requests.get(url, timeout=timeout)
        if response.status_code == 200:
            print(f"✅ {name}: {url} - STATUS {response.status_code}")
            return True
        else:
            print(f"⚠️  {name}: {url} - STATUS {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ {name}: {url} - ERROR {e}")
        return False

def main():
    services = {
        "Backend API": "http://localhost:1110/health",
        "Backend Root": "http://localhost:1110/",
        "Frontend": "http://localhost:1113",
        "PostgreSQL": "localhost:1111",  # Solo verificar puerto
        "Redis": "localhost:1112"        # Solo verificar puerto
    }
    
    print("🔍 VERIFICANDO SERVICIOS HELIOBIO-SOCIAL...")
    print("=" * 50)
    
    all_healthy = True
    
    for name, url in services.items():
        if "localhost" in url and "1111" in url or "1112" in url:
            # Verificación básica de puerto
            import socket
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            host = 'localhost'
            port = int(url.split(':')[-1])
            result = sock.connect_ex((host, port))
            if result == 0:
                print(f"✅ {name}: {host}:{port} - CONECTADO")
            else:
                print(f"❌ {name}: {host}:{port} - NO CONECTADO")
                all_healthy = False
            sock.close()
        else:
            if not check_service(name, url):
                all_healthy = False
    
    print("=" * 50)
    if all_healthy:
        print("🎉 ¡TODOS LOS SERVICIOS ESTÁN FUNCIONANDO!")
    else:
        print("💡 Algunos servicios tienen problemas. Revisa los logs:")
        print("   docker-compose logs backend")
        print("   docker-compose logs frontend")

if __name__ == "__main__":
    main()
