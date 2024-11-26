# Zadání

Vytvořit mobilní aplikaci (iOS/Android), která má tyto funkce:


Registrace

Přihlášení


Funkce po přihlášení:

- Tlačítko 1: Po kliku to načte formulář, kde si budete moci upravit své údaje

- Tlačítko 2: Po kliku se zobrazí okno, kde bude vidět přední kamera telefonu

- Tlačítko 3: Po kliku vyskočí okno, kde napíšete město a vypíše to aktuální počasí v tomto městě (níže je API)

### Struktura registrace

```{
 "email": "",
 "password": "",
 "phoneNumber": "",
 "cities": [
   {
     "name": "",
     "address": {
       "postCode": ""
     }
   }
 ]
}
```

- validace jednotlivých polí

- pro tlačítka použít spodní navigaci

- tlačítko 3: seznam uložených měst, klik na město zobrazí stránku s informací o vybraném městě + výsledky z API

# Dokončené úkoly

- Fungujicí android APP, iOS nemám k dispozici(netestoval jsem).
- Fungující registrace a přihlášení, všechny údaje jsou uloženy na zařízení.
- Profil - update telefonního čísla, listing vyhledávaný měst. Město se uloží hned po GET requestu. Proklik z listingu do Weather screenu.
- Kamera - Testováno jen na Android emulátoru.
- Počasí - Popup s Inputem který udělá GET request a uloží vyhledané místo. V dokumentaci jsem nenašel `postCode`, prozatím byl použit `countryCode`


# Screenshoty

![image](https://github.com/user-attachments/assets/82b9f800-379d-4e90-9486-a2c96904d1cb)
![image](https://github.com/user-attachments/assets/1e570580-c8e3-4b69-b904-b22ec0f3676e)
![image](https://github.com/user-attachments/assets/88ebb9e7-65c2-4546-a917-57e7f121cfc5)
![image](https://github.com/user-attachments/assets/27f4be52-07ed-4058-a031-5e030ad67131)
![image](https://github.com/user-attachments/assets/fce81fcd-d4f5-41e8-b928-3c7eb1696b35)


