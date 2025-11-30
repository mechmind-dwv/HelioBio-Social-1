# scripts/verify_ports.py
import requests
import asyncio
import websockets

def verify_all_services():
    """Verifica que todos los servicios estén corriendo en los nuevos puertos"""
    
    services = {
        "backend": "http://localhost:1110/health",
        "frontend": "http://localhost:1113",
        "jupyter": "http://localhost:1114",
        "adminer": "http://localhost:1116", 
        "ml-api": "http://localhost:1117/health",
        "postgres": "localhost:1111",
        "redis": "localhost:1112"
    }
    
    print("🔍 VERIFICANDO SERVICIOS HELIOBIO-SOCIAL...")
    
    for service, url in services.items():
        try:
            if service in ["postgres", "redis"]:
                # Verificación básica de puerto
                import socket
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                result = sock.connect_ex(('localhost', int(url.split(':')[-1])))
                if result == 0:
                    print(f"✅ {service.upper()} en puerto {url.split(':')[-1]}")
                else:
                    print(f"❌ {service.upper()} no responde")
                sock.close()
            else:
                response = requests.get(url, timeout=5)
                if response.status_code in [200, 302]:
                    print(f"✅ {service.upper()} en {url}")
                else:
                    print(f"⚠️  {service.upper()} responde con {response.status_code}")
        except Exception as e:
            print(f"❌ {service.upper()} error: {e}")

if __name__ == "__main__":
    verify_all_services()
