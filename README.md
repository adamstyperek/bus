# Opis
W opiniowaniu mamy dostępne dwa endpoity:
- otwieranie opiniowania,
- zamykanie opiniowania.

Wywołanie każdego z tych endpointów skutkuje zapisaniem opiniowania do repozytorium.
Po zapisaniu opiniowania generowany jest jeden z dwóch eventów:
- opiniowanie otwarte,
- opiniowanie zakończone.

W przypadku złapania eventu "opiniowanie otwarte" wywoływana jest komenda logowania zdarzenia otwarcia opiniowania.
W przypadku złapania eventu "opiniowanie zamknięte" wywoływana jest komenda logowania zdarzenia zamknięcia opiniowania oraz komenda wysłania powiadmienia do koordynatora.

Moduł koordynatora korzysta z systemu kolejkowego bull. Do jego działania potrzebny jest działający redis. Ustawienie adresu oraz portu do redis w pliku app.module.ts.
