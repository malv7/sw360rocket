import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {

        // const headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');

        // const user = 'admin@sw360.org';
        // const password = '12345';
        // const credentials = `grant_type=password&username=${user}&password=${password}`;
        // console.log(credentials);

        // console.log("WASCH DA LOS")

        // const uri = 'http://localhost:8080/authorization/oauth/token';
        // http.post(uri, credentials).subscribe(x => {
        //     console.log(x);
        //     console.log("aouisdfoasd")
        // });

        // const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsic3czNjAtUkVTVC1BUEkiXSwidXNlcl9uYW1lIjoiYWRtaW5Ac3czNjAub3JnIiwic2NvcGUiOlsic3czNjAucmVhZCIsInN3MzYwLndyaXRlIl0sImV4cCI6MTUxNTE3NTU0NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9TVzM2MF9VU0VSIl0sImp0aSI6ImY3NGQ4NTY1LTAyNTktNDFhMi1iYmIxLTM5YzUyYjUxNDlhOCIsImNsaWVudF9pZCI6InRydXN0ZWQtc3czNjAtY2xpZW50In0.ElYL5iyMVluqPs57WUIac2_tDY5Of8LFPQgcDenVDvsBRfeqeDESo5DI8z6cRbUO9v6oFzR74j8DLSmb6oMNQ-5krungCPgROBY-eM6pwdQatbFEOnprGxrFrHTUX8xYuIWh70RD2YOZ18njM4kiKU-zYtqfblruJXtk0SW5ga1oBkg_E9BWOZwL061m6UgJOKjHVxZZSTrevcuNjRaG_W-QwHJvJ1gRAyQtiilIRRfi_dxb7KmMAfjRtjA482Mr7SaFCPi1muL6vUtd5FKaPd_8EcnuUX_UzJdJjdGcmuJdP-ioIAcWVR8jH4i7taTyjvJMvzEOlqnfe1BbxWSQ1g';
        // console.log(token)
        // const componentsUri = 'http://localhost:8080/resource/api/components';
        // const headers = new HttpHeaders();
        // headers.set('Authorization', token);
        // http.get(componentsUri, { headers: headers }).subscribe(x => {
        //     console.log(x);
        // }, y => {
        //     console.log(y)
        //     console.log("FEHLER");
        // });
        
    }
}

/*
Sample request using curl
-------------------------

1. Get bearer token with user credentials:

curl -X POST \
--user 'trusted-sw360-client:sw360-secret' \
-d 'grant_type=password&username=admin@sw360.org&password=12345' \
http://localhost:8080/authorization/oauth/token 



2. Make request with token

curl 'http://localhost:8080/resource/api/components' -i -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsic3czNjAtUkVTVC1BUEkiXSwidXNlcl9uYW1lIjoiYWRtaW5Ac3czNjAub3JnIiwic2NvcGUiOlsic3czNjAucmVhZCIsInN3MzYwLndyaXRlIl0sImV4cCI6MTUxNTE2NDY5MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9TVzM2MF9VU0VSIl0sImp0aSI6ImY0ZmE0YjZiLTQ4NjQtNGJkOC05OGU0LTQ4YjgwNGFkNTkzOSIsImNsaWVudF9pZCI6InRydXN0ZWQtc3czNjAtY2xpZW50In0.RWP9sogxmO5RfcH1g1ougHGR9OLpItgCT3YM_xGNMwvSFN7OwPK_kX1Bsvd8xFQ5S6tDxY6xweJ9ApIKCW6Du6kioXpQa_ma-SJX8OHEaKVTcIR6sraXW0L9qNeLLK1eC6MYfj6jDDjbvvt3VM3-VHTdGUiyC4P1jep_gprsT7Hox91uNXAYazCQdJGKE3j-9JFVx86BuHzcYvBbGqYM11DBdkOcsyduqBX2QBiRoItHaanShWGR7ggT1eedjIRnWtcDvShrqRevgrO0_8t4gYjgT35kuDjxM5NglM0d96tZgzGQRViLIwzmk3F14lbLabRf03b8Z4mu_3aL1IMPKA' -H 'Accept: application/hal+json'
*/