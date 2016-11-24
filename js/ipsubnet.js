// GitHub project ipsubnet
// Licensed under https://github.com/jmpep/ipsubnet/blob/master/LICENSE-MIT

var cookie_enable;

function initializeValues(iptype,ipval,nbrbits,mask,subnetval,broadcastval,hostfromval,hosttoval,hostsnbval,ipsnbval) {
  var IP = document.getElementById("IP");
  var bits = document.getElementById("bits");
  var subnet = document.getElementById("subnet");
  var broadcast = document.getElementById("broadcast");
  var hostfrom = document.getElementById("hostfrom");
  var hostto = document.getElementById("hostto");
  var btIPv4 = document.getElementById("btIPv4");
  var netmask = document.getElementById("netmask");
  var hostsnb = document.getElementById("hostsnb");
  var ipsnb = document.getElementById("ipsnb");
  /* the DOM variable above are for compatibility wit IE */
  IP.value =ipval;
  bits.value=nbrbits;
  subnet.value=subnetval;
  broadcast.value=broadcastval;
  hostfrom.value=hostfromval;
  hostto.value=hosttoval;
  if (btIPv4.className.indexOf('active')>=0) {
    netmask.value=mask;
  } else {
    netmask.value=nbrbits;
  }
//  if (btIPv4.className.indexOf('active')<0) sectionbroadcast.style.display='none';
//  else sectionbroadcast.style.display='inline';
  hostsnb.value=hostsnbval;
  ipsnb.value=ipsnbval;
}

function initializeIPsubnet() {
  initializeValues('IPv4','127.0.0.1',32,'255.255.255.255','127.0.0.0','127.0.0.1','127.0.0.1','127.0.0.1',1,1)
//2001:0db8:85a3:08d3:1319:8a2e:0370:7344;
//2001:0db8:85a3:08d3:1319:8a2e:127.98.76.154;
  cookie_enable=(navigator.cookieEnabled == true);
  if (cookie_enable) {
    temp = getCookie('IPv4v6');
    if (temp=='') storeAllCookie();
    else getAllCookie();
  }
//  calculwithIPv6condensed(0);
//  calculwithIPv6alternative(0);
  changeInfo();
}

function storeAllCookie() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var btIPv6 = document.getElementById("btIPv6");
  var btIPv6c = document.getElementById("btIPv6c");
  var btIPv6a = document.getElementById("btIPv6a");
  var bits = document.getElementById("bits");
  var subnet = document.getElementById("subnet");
  var broadcast = document.getElementById("broadcast");
  var hostfrom = document.getElementById("hostfrom");
  var hostto = document.getElementById("hostto");
  var netmask = document.getElementById("netmask");
  var hostsnb = document.getElementById("hostsnb");
  var ipsnb = document.getElementById("ipsnb");
  var imglanguage = document.getElementById("imglanguage");
  /* the DOM variable above are for compatibility wit IE */
  var lang;
  if (cookie_enable) {
   var days = 60;
   if (btIPv4.className.indexOf('active')>=0) {
     setCookie('IPv4v6','IPv4',days);
   } else if (btIPv6.className.indexOf('active')>=0) {
     setCookie('IPv4v6','IPv6',days);
   } else if (btIPv6c.className.indexOf('active')>=0) {
     setCookie('IPv4v6','IPv6c',days);
   } else if (btIPv6a.className.indexOf('active')>=0) {
     setCookie('IPv4v6','IPv6a',days);
   } else {
     setCookie('IPv4v6','default',days);
   }
   setCookie('IP',IP.value,days);
   setCookie('bits',bits.value,days);
   setCookie('netmask',netmask.value,days);
   setCookie('subnet',subnet.value,days);
   setCookie('broadcast',broadcast.value,days);
   setCookie('hostfrom',hostfrom.value,days);
   setCookie('hostto',hostto.value,days);
   setCookie('hostsnb',hostsnb.value,days);
   setCookie('ipsnb',ipsnb.value,days);
   var lang= imglanguage.className.replace('imglanguage','').trim();
   setCookie('lang',lang,days);
  }
}

function getAllCookie() {
  var IP = document.getElementById("IP");
  var bits = document.getElementById("bits");
  var subnet = document.getElementById("subnet");
  var broadcast = document.getElementById("broadcast");
  var hostfrom = document.getElementById("hostfrom");
  var hostto = document.getElementById("hostto");
  var btIPv4 = document.getElementById("btIPv4");
  var btIPv6 = document.getElementById("btIPv6");
  var btIPv6c = document.getElementById("btIPv6c");
  var btIPv6a = document.getElementById("btIPv6a");
  var netmask = document.getElementById("netmask");
  var hostsnb = document.getElementById("hostsnb");
  var ipsnb = document.getElementById("ipsnb");
  var imglanguage = document.getElementById("imglanguage");
  /* the DOM variable above are for compatibility wit IE */
  var ipid,ipidlist; 
  if (cookie_enable) {
    IP.value = getCookie('IP');
	ipid=getCookie('IPv4v6');
	btIPv4.className = btIPv4.className.replace('active','');
	btIPv6.className = btIPv6.className.replace('active','');
	btIPv6a.className = btIPv6a.className.replace('active','');
	btIPv6c.className = btIPv6c.className.replace('active','');
	switch (ipid) {
		case 'IPv4': btIPv4.className = 'active '+btIPv4.className; break;
		case 'IPv6': btIPv6.className = 'active '+btIPv6.className; break;
		case 'IPv6a': btIPv6a.className = 'active '+btIPv6a.className; break;
		case 'IPv6c': btIPv6c.className = 'active '+btIPv6c.className; break;
		default:  btIPv4.className = 'active '+btIPv4.className;
	}
    IP.value= getCookie('IP');
    bits.value= getCookie('bits');
    netmask.value= getCookie('netmask');
    subnet.value= getCookie('subnet');
    broadcast.value= getCookie('broadcast');
    hostfrom.value= getCookie('hostfrom');
    hostto.value= getCookie('hostto');
    hostsnb.value= getCookie('hostsnb');
    ipsnb.value= getCookie('ipsnb');
    lang= getCookie('lang');
	setlanguageObjects(lang);
  }
}

function setCookie(cname, cvalue, days) {
    var exp,expiration = new Date();
    expiration.setTime(expiration.getTime() + (days * 24 * 60 * 60 * 1000));
    exp = '; expires=' + expiration.toGMTString();
    document.cookie = cname + '=' + encodeURI(cvalue) + ';';
}

function getCookie(cname) {
    var name = cname,value='';
    var cook = document.cookie.split(';');
    for(var i = 0; i <cook.length; i++) {
		var pos = cook[i].indexOf(cname+'=');
        if (pos>=0) {
           val = cook[i].split('=');
		   value= decodeURI(val[1]);
           break;
		}
    }
    return value;
}
// -------------------------------------------
// find How many semicolon and return the 
// last position
function Howmanysemicolon(val,last) {
  var indx,fromindex=0,j=0;
  lg=val.length;
  fromindex=0;
  while (j<lg) {
     indx=val.indexOf(":",fromindex);
     if (indx<0) break;
     fromindex=indx+1;
     j++;
  }
  last[0]= fromindex-1;
  return j;
}

// -----------------------------------------
// find the version and return each part
//   IP value in textformat
//   tpart is array of the each part of the IP, filled in all cases
//   tpartip4 is Array(4) for each part of the ip4
//   infoip is Array(2)
//      where infoip[0] is IP type (ip4,ip6,ip6alt,ip6cond)
//        and infoip[1] errornumber
//                         = 0    is no error
//                         <-1000 is error on the number of part with '.'
//                         > 1000 is error of a number in the IP
//
function findIPversion(val,tpart,tpartip4,tinfoip) {
  var lg,j;
  var iserror=0;
  var fromindex,indx,nbsemi=0,nbsemicolonmax=0;
  var lastsemi= new Array(1);
  var ipv4;
  var tpartip4txt = new Array(4);  
  var tparttxt = new Array(8);
  var tparttxt2 = new Array(2);
  var ip_type,iptype,condensed;

  ip_type='ip4';
  tparttxt[0]=tparttxt[1]=tparttxt[2]=tparttxt[3]=tparttxt[4]=tparttxt[5]=tparttxt[6]=tparttxt[7]='0';
  tpart[0]=tpart[1]=tpart[2]=tpart[3]=tpart[4]=tpart[5]=tpart[6]=tpart[7]=0;
  if ((nbsemi=Howmanysemicolon(val,lastsemi))>0) ip_type='ip6';
  iptype=ip_type;
//alert('findIPversion:ip_type='+ip_type+',nbsemi='+nbsemi+',lastsemi='+lastsemi[0]);
  //IPv4 or IPv6 alternative 
  tpartip4txt[0]=tpartip4txt[1]=tpartip4txt[2]=tpartip4txt[3]='0';
  tpartip4[0]=tpartip4[1]=tpartip4[2]=tpartip4[3]=0;
  if (val.indexOf(".")>0) {
      // either IPv4 or IPv6 alternative
      if (ip_type=='ip6') {
        iptype='ip6alt';
        // search the alternative part
        ipv4=val.substring(lastsemi[0]+1,val.length);
      } else {
        ipv4=val;
      }
//alert('findIPversion:iptype='+iptype+',nbsemi='+nbsemi+',lastsemi='+lastsemi[0]+',ipv4='+ipv4);
      lg=ipv4.length;
      fromindex=0;
      j=0;
      for (var i=0; i<lg;) {
         indx=ipv4.indexOf(".",fromindex);
         if (indx<0) {
           tpartip4txt[j]=ipv4.substring(fromindex,lg);
           j++;
           break;
         } else tpartip4txt[j]=ipv4.substring(fromindex,indx);
         i=indx+1;
         fromindex=indx+1;
         j++;
      }
      for (var i=0;i<4;i++) tpartip4[i]=parseInt(tpartip4txt[i],10);
      if (j<3) iserror=-j-1001;
      for (var i=0; i<4; i++) if ((tpartip4[i]<0)|(tpartip4[i]>255)|(isNaN(tpartip4[i]))) iserror=i+1001;
      tparttxt[6]=tparttxt2[0]=(tpartip4[0]*256+tpartip4[1]*1).toString(16);
      tparttxt[7]=tparttxt2[1]=(tpartip4[2]*256+tpartip4[3]*1).toString(16);
//alert('IPV4 part:'+tpartip4[0]+'.'+tpartip4[1]+'.'+tpartip4[2]+'.'+tpartip4[3]+','+tparttxt[6]+':'+tparttxt[7]);
  }
  if (!iserror) {
    if (ip_type!=='ip4') {
	// treat the IPv6 addresses
	nbsemicolonmax= (ip_type=='ip6') ? ((iptype=='ip6alt')?6:7) : 6;
	// replace the missing :
	condensed=val.match("::");
	if (condensed) {
	   missingsemicolon=nbsemicolonmax-nbsemi;
//alert('replace vorher='+val+' missingsemicolon='+missingsemicolon);
	   replacetxt=':0:';
	   for (var i=0;i<missingsemicolon;i++) replacetxt= replacetxt+ '0:';
//alert('replacetxt='+replacetxt);
	   val=val.replace(/::/,replacetxt);
//alert('replace nachher='+val+' replacetxt='+replacetxt);
	}
	// search all IPv6 parts
	fromindex= 0;
	lg= val.length;
	j=0;
	while (j<(nbsemicolonmax+1)) {
	  var iptemp;
	  indx=val.indexOf(":",fromindex);
          if (indx<0) {
             if (ip_type=='ip6') {
               iptemp=val.substring(fromindex,lg);
               if (iptemp!=='') tparttxt[j] = iptemp;
             }
             j++;
             break;
           } else {
             tparttxt[j] =val.substring(fromindex,indx);
             j++;
           }
	  i=indx+1;
	  fromindex=indx+1;
	}
	// replace the alternative part
	if (iptype=='ip6alt') {
		tparttxt[6]=tparttxt2[0];
		tparttxt[7]=tparttxt2[1];
	}
	if (condensed)
	  if (iptype=='ip6alt') iptype='ip6altcond';
	  else iptype='ip6cond';
    }
  }
  for (var i=0;i<8;i++) { tpart[i]=parseInt(tparttxt[i],16); if (tpart[i]>65535) iserror=i+1;}
//alert('semimax='+nbsemicolonmax+',iptype='+iptype+' IPV6 format:'+tpart[0].toString(16)+':'+tpart[1].toString(16)+':'+tpart[2].toString(16)+':'+tpart[3].toString(16)+':'+tpart[4].toString(16)+':'+tpart[5].toString(16)+':'+tpart[6].toString(16)+':'+tpart[7].toString(16));
  tinfoip[0]= iptype;
  tinfoip[1]= iserror;
//alert('tinfoip[0]='+tinfoip[0]+'tinfoip[1]='+tinfoip[1]);
  return (iserror==0);
}

function alerterrorIP(part,partip4,infoip) {
    if ((infoip[1]<=-1000)||(infoip[1]>=1000))
      alert('is error in the part:'+((infoip[1]>0)?infoip[1]-1000:1000-infoip[1])+' of the IPv4 '
        +partip4[0].toString(10)+'.'+partip4[1].toString(10)+'.'+partip4[2].toString(10)+'.'+partip4[3].toString(10)+'');
    else 
      alert('is error in the part :'+((infoip[1]>0)?(infoip[1]):-1*infoip[1])+' of the IPv6 '
        +part[0].toString(16)+':'+part[1].toString(16)+':'+part[2].toString(16)+':'+part[3].toString(16)+':'
        +part[4].toString(16)+':'+part[5].toString(16)+':'+part[6].toString(16)+':'+part[7].toString(16));
  }

function checkIPaddress(val,part,infoip) {
  var partip4 = new Array(4);  
//  var infoip= new Array(2);
  
  // conversion in IPv6
  if (findIPversion(val,part,partip4,infoip)) {
    // ipv4 or ipv6 alternative
    if (infoip[0]=='ip4') {
       valfinal= part[0].toString(16)+':'+part[1].toString(16)+':'+part[2].toString(16)+':'+part[3].toString(16)
          +':'+part[4].toString(16)+':'+part[5].toString(16)+':'
          +partip4[0].toString(10)+'.'+partip4[1].toString(10)+'.'+partip4[2].toString(10)+'.'+partip4[3].toString(10)
          +'('+part[6].toString(16)+':'+part[7].toString(16)+')';
    } else {
       valfinal= part[0].toString(16)+':'+part[1].toString(16)+':'+part[2].toString(16)+':'+part[3].toString(16)
          +':'+part[4].toString(16)+':'+part[5].toString(16)+':'+part[6].toString(16)+':'+part[7].toString(16);
    }
//    alert('checkIPaddress:'+valfinal);
  } else alerterrorIP(part,partip4,infoip);
  return infoip[1];
}

//ipv6alternative
function condense(txt) {
  var tnullbegin = new Array(10);  
  var tnullto    = new Array(10);
  var nullindx=-1,pres=0,j=-1;
  rtrtxt= txt;
  if (btIPv6c.className.indexOf('active')>=0) {
    for (var i=0, indx=0;i<txt.length;) {
            indx=txt.indexOf(":0:",i);
            if (indx<0) break;
            else {
		if (pres!==(indx-2)) {
		  nullindx++;
 	  	  tnullbegin[nullindx]=indx;
		  tnullto[nullindx]=indx;
		}
		else tnullto[nullindx]=indx;
            	pres=indx;
            }
            i=indx+1;
    }
    for (var i=0, avant=0; i<=nullindx;i++) {
      if (j==-1) { j=i ; avant=i; }
      else if ((tnullto[avant]-tnullbegin[avant])>(tnullto[i]-tnullbegin[i])) { avant=i;j=i;}
    }
    if (j>=0) {
      rtrtxt= txt.replace(txt.substring(tnullbegin[j],tnullto[j]+2),':');
    }
  }
  return rtrtxt;
}

function transformIPtotxt(ipversionv4,tip) {
  var masktxt='';
  var temp1,temp2,temp3,temp4;
    temp1= tip[6]>>8;
    temp2= tip[6] & 255;
    temp3= tip[7]>>8;
    temp4= tip[7] & 255;
    if (ipversionv4) {
 	masktxt= temp1+'.'+temp2+'.'+temp3+'.'+temp4;
 	}
    else {
 	masktxt=tip[0].toString(16)+':'+tip[1].toString(16)+':'+tip[2].toString(16)
 	   +':'+tip[3].toString(16)+':'+tip[4].toString(16)+':'+tip[5].toString(16);
 	if (btIPv6a.className.indexOf('active')>=0) {
 	   masktxt=masktxt+':'+temp1+'.'+temp2+'.'+temp3+'.'+temp4;
 	} else
 	   masktxt=masktxt+':'+tip[6].toString(16)+':'+tip[7].toString(16);
 	   masktxt=condense(masktxt);
   }
  return masktxt;
}

function changeSubnet() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  var subnet = document.getElementById("subnet");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var valbin= new Array(8);
  var valbintxt= new Array(8);
  var subnetval= new Array(8);
  var nbbits,ipversionv4,ipval;
  var infoip= new Array(2);

  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  // calcul de l'IP dans le format ipv6
  ipval=IP.value;
  error=checkIPaddress(ipval,retval,infoip);
  // calcul du mask
  valbintxt[0]=valbintxt[1]=valbintxt[2]=valbintxt[3]='';
  valbintxt[4]=valbintxt[5]=valbintxt[6]=valbintxt[7]='';
  bitszone=96;
  nbbits=(ipversionv4)? (parseInt(bits.value,10)+bitszone):parseInt(bits.value,10);
  for (var i=0,j=0,k=0; i<128; i++) {
      if (i<nbbits) {
         valbintxt[j]=valbintxt[j]+'1';
      } else {
        valbintxt[j]=valbintxt[j]+'0';
      }
      k++;
      if (k>15) { j++; k=0;}
  }
  for (var i=0;i<8;i++) valbin[i]=parseInt(valbintxt[i],2);
  if (!error) {
    for (var i=0;i<8;i++) {
        subnetval[i]= retval[i] & valbin[i];
    }    
    subnet.value= transformIPtotxt(ipversionv4,subnetval);
  }
}

function calculMaskIPv4(nbbits) {
  var valbin,masktxt;
  if (nbbits<1) nbbits=1;
  valbin='';
  for (var i=0; i<32; ++i) {
      if (i<nbbits) valbin =valbin+'1'; else valbin=valbin+'0';
  }
  masktxt=''+parseInt(valbin.substring(0,8),2)+'.'+parseInt(valbin.substring(8,16),2)+'.'
    	 +parseInt(valbin.substring(16,24),2)+'.'+parseInt(valbin.substring(24,32),2);
  return masktxt;
}

function calculeMaskBits()
{
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  var netmask = document.getElementById("netmask");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var valmask,maxbits,minbits,valbits,ipval;
  var infoip= new Array(2);
  
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  valbits=bits.value;
  if (ipversionv4) {
     ipval=IP.value;
     error=checkIPaddress(ipval,retval,infoip);
     if (!error) {
      if (retval[6]<0x8000) minbits=3; 
       else if ((0x7fff<retval[6]) & (retval[6]< 0xc000)) minbits=8;
        else if ((0xbfff<retval[6]) & (retval[6]< 0xe000)) minbits=16; 
           else minbits=3;
      } else minbits=3;
   }
   else {
    ipval=IP.value;
    error=checkIPaddress(ipval,retval,infoip);
    if (!error) {
       if (retval[0]<2) minbits=128; // Unspecified & Loopback
       else if ((8191<retval[0]) & (retval[0]<8194)) minbits=16; // internet
        else if (retval[0]==65280) minbits=8; // Multicast
          else if ((retval[0]==65152) || (retval[0]==65216)) minbits=10; // Link-local unicast & Site-local unicast
           else minbits=3;
      } else minbits=3;
   }
  if (valbits<minbits) valbits=minbits;
  if (ipversionv4) maxbits=32; else maxbits=128;
  if (valbits>maxbits) valbits=maxbits;
  bits.value=valbits;
  valmasktxt= calculMaskIPv4(valbits);
  if (ipversionv4) {
	  netmask.value= valmasktxt;
  } else {
	  netmask.value= bits.value;
  }
}

function bitsToHostsnb() {
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  var hostsnb = document.getElementById("hostsnb");
  var selecthostsnb = document.getElementById("selecthostsnb");
  /* the DOM variable above are for compatibility wit IE */
  var maxhost;
  var ipversionv4,nbrbits;

  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  nbrbits= (ipversionv4) ? 32-bits.value: 128-bits.value;
  maxhost=Math.pow(2,nbrbits)-2;
  if (maxhost<1) maxhost=1;
  hostsnb.value=maxhost;
  selecthostsnb.value=maxhost+2;
//alert('bitsToHostsnb:'+maxhost);
}

function hostsnbToBits() {
  var btIPv4 = document.getElementById("btIPv4");
  var selecthostsnb = document.getElementById("selecthostsnb");
  var bits = document.getElementById("bits");
  /* the DOM variable above are for compatibility wit IE */
  var ipversionv4,maxhost,nbr,hostsnb,nbrbits,nbrbitshosts;
  var maxhostipv6;
  
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  maxhostipv6=Math.pow(2,120); // en fait depends de l'IP
  maxhost=(ipversionv4)?(4294967296):maxhostipv6;
  h=1;if (selecthostsnb.value>2) h=(selecthostsnb.value-2);
  nbr=Math.floor(2+(parseInt(h,10))/2)*2; // devient un multiple de deux
  if (nbr<1) nbr=1;
  if (nbr>maxhost) nbr=maxhost;
  nbrbitshosts=Math.floor(Math.log(nbr+2)/Math.log(2));
  nbrbits=(ipversionv4)?(32-nbrbitshosts):(64-nbrbitshosts);
  bits.value= nbrbits;
  bitsToHostsnb();  // peut-etre n'etait pas une puissance de deux
}

function bitsToIPsnb() {
  var btIPv4 = document.getElementById("btIPv4");
  var ipsnb = document.getElementById("ipsnb");
  var bits = document.getElementById("bits");
  /* the DOM variable above are for compatibility wit IE */
  var maxips;
  var ipversionv4;

  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  nbrbits= (ipversionv4) ? 32-bits.value: 128-bits.value;
  maxips=Math.pow(2,nbrbits);
  ipsnb.value=maxips;
}

function ipsnbToBits() {
  var btIPv4 = document.getElementById("btIPv4");
  var ipsnb = document.getElementById("ipsnb");
  var bits = document.getElementById("bits");
  /* the DOM variable above are for compatibility wit IE */
  var ipversionv4,maxips,nbr,hostsnb,nbrbits,nbrbitsips;
  var maxhostipv6;
  
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  maxhostipv6=Math.pow(2,120); // en fait depends de l'IP
  maxhost=(ipversionv4)?(4294967296):maxhostipv6;
  nbr=Math.floor((parseInt(ipsnb.value,10))/2)*2;
  if (nbr<1) nbr=1;
  if (nbr>maxips) nbr=maxips;
  nbrbitsips=Math.floor(Math.log(nbr+2)/Math.log(2));
  nbrbits=(ipversionv4)?(32-nbrbitsips):(64-nbrbitsips);
  bits.value= nbrbits;
  bitsToIPsnb();  // peut-etre n'etait pas une puissance de deux
}

function getBroadcast() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  var broadcast = document.getElementById("broadcast");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var valbin= new Array(8);
  var valbintxt= new Array(8);
  var tbroadcast= new Array(8);
  var ipversionv4,nbbits,broadcasttxt;
  var infoip= new Array(2);

  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  valbintxt[0]=valbintxt[1]=valbintxt[2]=valbintxt[3]='';
  valbintxt[4]=valbintxt[5]=valbintxt[6]=valbintxt[7]='';
  bitszone=96;
  nbbits=(ipversionv4)? (parseInt(bits.value,10)+bitszone):parseInt(bits.value,bitszone);
  for (var i=0,j=0,k=0; i<128; i++) {
      if (i<nbbits) {
         valbintxt[j]=valbintxt[j]+'0';
      } else {
        valbintxt[j]=valbintxt[j]+'1';
      }
      k++;
      if (k>15) { j++; k=0;}
  }
  for (var i=0;i<8;i++) valbin[i]=parseInt(valbintxt[i],2);
  ipval= IP.value;
  error= checkIPaddress(ipval,retval,infoip);
  if (!error) {
    for (var i=0;i<8;i++) {
        tbroadcast[i]= retval[i] | valbin[i];
    }
    tbroadcast[0]= 65280; // no broadcast in IPv6, broadcast is a multicast FF00
    broadcasttxt=transformIPtotxt(ipversionv4,tbroadcast);
    broadcast.value= broadcasttxt;
  }
}

function getHostfrom() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var subnet = document.getElementById("subnet");
  var hostfrom = document.getElementById("hostfrom");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var valbin= new Array(8);
  var thostfrom= new Array(8);
  var ipversionv4,nbbits,hostfromtxt,subnetval;
  var infoip= new Array(2);

  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  valbin = [ 0, 0, 0, 0, 0, 0, 0, 1 ];
  subnetval= subnet.value;
  error= checkIPaddress(subnetval,retval,infoip);
  if (!error) {
    for (var i=0;i<8;i++) {
        thostfrom[i]= retval[i] | valbin[i];
    }
   hostfromtxt=transformIPtotxt(ipversionv4,thostfrom);
   hostfrom.value= hostfromtxt;
  }
}

function getHostTo() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  var subnet = document.getElementById("subnet");
  var hostto = document.getElementById("hostto");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var valbin= new Array(8);
  var valbintxt= new Array(8);
  var thostto= new Array(8);
  var ipversionv4,nbbits,hosttotxt,valsubnet;
  var infoip= new Array(2);

  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  valbintxt[0]=valbintxt[1]=valbintxt[2]=valbintxt[3]='';
  valbintxt[4]=valbintxt[5]=valbintxt[6]=valbintxt[7]='';
  bitszone=96;
  nbbits=(ipversionv4)? (parseInt(bits.value,10)+bitszone):parseInt(bits.value,10);
  for (var i=0,j=0,k=0; i<128; i++) {
      if (i<nbbits) {
         valbintxt[j]=valbintxt[j]+'0';
      } else {
        if (i==127) valbintxt[j]=valbintxt[j]+'0';
          else valbintxt[j]=valbintxt[j]+'1';
      }
      k++;
      if (k>15) { j++; k=0;}
  }
  for (var i=0;i<8;i++) valbin[i]=parseInt(valbintxt[i],2);
  valsubnet= subnet.value;
  error= checkIPaddress(valsubnet,retval,infoip);
  if (!error) {
    for (var i=0;i<8;i++) {
        thostto[i]= retval[i] | valbin[i];
    }
    hosttotxt=transformIPtotxt(ipversionv4,thostto);
    hostto.value= hosttotxt;
  }
}

function subnetToIP() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  var subnet = document.getElementById("subnet");
  /* the DOM variable above are for compatibility wit IE */
  var retvalsub= new Array(8);
  var retvalip= new Array(8);
  var newvalip= new Array(8);
  var valbin= new Array(8);
  var valbintxt= new Array(8);
  var valsub,valip,valiptxt,nbbits,error,error2;
  var infoip= new Array(2);
  
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  valsub= subnet.value;
  error=checkIPaddress(valsub,retvalsub,infoip);
  valip = IP.value;
  error2=checkIPaddress(valip,retvalip,infoip);
  valbintxt[0]=valbintxt[1]=valbintxt[2]=valbintxt[3]='';
  valbintxt[4]=valbintxt[5]=valbintxt[6]=valbintxt[7]='';
  bitszone=96;
  nbbits=(ipversionv4)? (parseInt(bits.value,10)+bitszone):parseInt(bits.value,10);
  for (var i=0,j=4,k=0; i<128; i++) {
      if (i<nbbits) {
         valbintxt[j]=valbintxt[j]+'0';
      } else {
        valbintxt[j]=valbintxt[j]+'1';
      }
      k++;
      if (k>15) { j++; k=0;}
  }
  for (var i=0;i<8;i++) valbin[i]=parseInt(valbintxt[i],2);
  if (!error) {
    for (var i=0;i<8;i++) {
        // prend la partie hosts
        newvalip[i]= retvalip[i] & valbin[i];
        // rajoute le subnet
        newvalip[i]= retvalsub[i] | newvalip[i];
    }
    valiptxt=transformIPtotxt(ipversionv4,newvalip);
    IP.value= valiptxt;
  }
}

function subnetToNbbits() {
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  var netmask = document.getElementById("netmask");
  var selecthostsnb = document.getElementById("selecthostsnb");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var val,error,nbrbitshosts,nbrbits;
  var infoip= new Array(2);
  
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  if (ipversionv4) {
   val= netmask.value;
   error=checkIPaddress(val,retval,infoip);
   nbrbitshosts=0;
   for (var i=7; i>6; i--) {
    var a=retval[i],b;
    b= a.toString(2);
    for (j=b.length-1;j>0;j--)
      if (b.charAt(j)=='0') nbrbitshosts++;
      else {
        i=-1; // to stop
        // check the mask        
        break;
      }
   }
   nbrbits=(ipversionv4)?(32-nbrbitshosts):(128-nbrbitshosts);
   if (nbrbits<=0) nbrbits=1;
   bits.value= nbrbits;
  }
}

function addIP(direction) {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var tnewip= new Array(8);
  var newiptxt,ipval,ipversionv4;
  var infoip= new Array(2);
  var valbin = [ 0, 0, 0, 0, 0, 0, 0, 1 ];
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  ipval= IP.value;
  error= checkIPaddress(ipval,retval,infoip);
  if (!error) {
    var retenue=0;
    if (direction=='-1') {
      for (var i=0;i<8;i++) {
        tnewip[i]= retval[i] - valbin[i] - retenue;
        if (tnewip[i]<0) { tnewip[i]=0; retenue=32768; }
        else retenue=0;
      }
    } else {
      for (var i=7;0<=i;i--) {
        tnewip[i]= retval[i] + valbin[i] + retenue;
        if (tnewip[i]>65535) { tnewip[i]=0; retenue=1; }
        else retenue=0;
      }
    }
    newiptxt=transformIPtotxt(ipversionv4,tnewip);
    IP.value= newiptxt;
  }
}

function range(direction) {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var valbin= new Array(8);
  var valbintxt= new Array(8);
  var tnewip= new Array(8);
  var ipversionv4,nbbits,newiptxt;
  var infoip= new Array(2);

  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  valbintxt[0]=valbintxt[1]=valbintxt[2]=valbintxt[3]='';
  valbintxt[4]=valbintxt[5]=valbintxt[6]=valbintxt[7]='';
  bitszone=96;
  nbbits=(ipversionv4)? (parseInt(bits.value,10)+bitszone):(parseInt(bits.value,10));
  for (var i=1,j=0,k=0; i<=128; i++) {
      if (nbbits==i) {
         valbintxt[j]=valbintxt[j]+'1';
      } else {
        valbintxt[j]=valbintxt[j]+'0';
      }
      k++;
      if (k>15) { j++; k=0;}
  }
  for (var i=0;i<8;i++) valbin[i]=parseInt(valbintxt[i],2);
//alert('range('+direction+') nbbits='+nbbits+' valbin='+valbintxt[0]+valbintxt[1]+valbintxt[2]+valbintxt[3]+valbintxt[4]+valbintxt[5]+valbintxt[6]+valbintxt[7]);
  ipval= IP.value;
  error= checkIPaddress(ipval,retval,infoip);
//alert('return range:'+retval[0].toString(16)+':'+retval[1].toString(16)+':'+retval[2].toString(16)+':'+retval[3].toString(16)
//	+':'+retval[4].toString(16)+':'+retval[5].toString(16)+':'+retval[6].toString(16)+':'+retval[7].toString(16));
  if (!error) {
    var retenue=0;
    if (direction=='-1') {
      for (var i=0;i<8;i++) {
        tnewip[i]= retval[i] - valbin[i] - retenue;
        if (tnewip[i]<0) { tnewip[i]=0; retenue=32768; }
        else retenue=0;
      }
    } else {
      for (var i=7;0<=i;i--) {
        tnewip[i]= retval[i] + valbin[i] + retenue;
        if (tnewip[i]>65535) { tnewip[i]=0; retenue=1; }
        else retenue=0;
      }
    }
    newiptxt=transformIPtotxt(ipversionv4,tnewip);
//alert('range('+direction+') newIP='+tnewip[0].toString(16)+':'+tnewip[1].toString(16)+':'+tnewip[2].toString(16)+':'+tnewip[3].toString(16)
//+':'+tnewip[4].toString(16)+':'+tnewip[5].toString(16)+':'+tnewip[6].toString(16)+':'+tnewip[7].toString(16)
//+' valbin='+valbintxt[0]+valbintxt[1]+valbintxt[2]+valbintxt[3]+valbintxt[4]+valbintxt[5]+valbintxt[6]+valbintxt[7]);
    IP.value= newiptxt;
  }
}

function calculmaskval() {
  var btIPv4 = document.getElementById("btIPv4");
  var netmask = document.getElementById("netmask");
  /* the DOM variable above are for compatibility wit IE */
  if (btIPv4.className.indexOf('active')>=0) {
	calculsubnetmaskval();
  } else {
	bits.value=netmask.value;
	calculeBits();
  }
}
function calculsubnetmaskval() {
  // check & change subnet 
  subnetToNbbits();
  calculeMaskBits(); // to be sure for the right mask
  subnetToIP();
  bitsToHostsnb();
  bitsToIPsnb();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  storeAllCookie();
}

function calculeSubnetval() {
  // check & change subnet 
  // change IP addresse
  subnetToIP();
  bitsToHostsnb();
  bitsToIPsnb();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  storeAllCookie();
}

function calculeAddBits(nbr) {
  var bits = document.getElementById("bits");
  /* the DOM variable above are for compatibility wit IE */
  bits.value=parseInt(bits.value,10)+parseInt(nbr,10);
  calculeBits();
}

function calculeBits() {
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  /* the DOM variable above are for compatibility wit IE */
  var minbits=3, maxbits;
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  valbits = parseInt(bits.value,10);
  if (valbits<minbits) valbits=minbits;
  if (ipversionv4) maxbits=32; else maxbits=128;
  if (valbits>maxbits) valbits=maxbits;
  bits.value=valbits;
  calculeMaskBits();
  changeSubnet();
  bitsToHostsnb();
  bitsToIPsnb();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

function calculeEnter() {
  calculeMaskBits();
  changeSubnet();
  bitsToHostsnb();
  bitsToIPsnb();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

function calculeButton() {
  calculeMaskBits();
  changeSubnet();
  bitsToHostsnb();
  bitsToIPsnb();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

function calculBitsToSelectHostsnb() {
  var bits = document.getElementById("bits");
  var selecthostsnb = document.getElementById("selecthostsnb");
  /* the DOM variable above are for compatibility wit IE */
	selecthostsnb.value=bits.value;
}
function calculHostsnbToBits() {
  var bits = document.getElementById("bits");
  var selecthostsnb = document.getElementById("selecthostsnb");
  /* the DOM variable above are for compatibility wit IE */
	bits.value= selecthostsnb.value;
	if (bits.value>24) changeIPv6();
	else calculeBits();

}

function calculIPsnbToBits() {
  ipsnbToBits();
  //change bits and subnet
  bits_to_hosts();
  calculeMaskBits();
  changeSubnet();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

function calculRange(direction) {
  range(direction);
  //change bits and subnet
  calculeMaskBits();
  changeSubnet();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

function calculeAddIP(direction) {
  addIP(direction);
  //change bits and subnet
  calculeMaskBits();
  changeSubnet();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

function changeClassSelecthostsnb(version) {
  var selecthostsnb = document.getElementById("selecthostsnb");
  /* the DOM variable above are for compatibility wit IE */
	if (version=='IPv6') {
		if (selecthostsnb.className.indexOf('ipv6')<0) {
		  selecthostsnb.className = selecthostsnb.className + ' ipv6';
		} 
	} else {
		selecthostsnb.className = selecthostsnb.className.replace(' ipv6','');
	}
}

function changeClassButton(button){
  var btIPv4 = document.getElementById("btIPv4");
  var btIPv6 = document.getElementById("btIPv6");
  var btIPv6c = document.getElementById("btIPv6c");
  var btIPv6a = document.getElementById("btIPv6a");
  var bits = document.getElementById("bits");
  /* the DOM variable above are for compatibility wit IE */
	btIPv4.className = btIPv4.className.replace('active ','');
	btIPv6.className = btIPv6.className.replace('active ','');
	btIPv6a.className = btIPv6a.className.replace('active ','');
	btIPv6c.className = btIPv6c.className.replace('active ','');
	btIPv4.className = btIPv4.className.replace('active','');
	btIPv6.className = btIPv6.className.replace('active','');
	btIPv6a.className = btIPv6a.className.replace('active','');
	btIPv6c.className = btIPv6c.className.replace('active','');
	if (button.className=='') { button.className = 'active'; }
	else {button.className = 'active '+button.className;}
}

var ipv6condensed=0;
function calculwithIPv6condensed() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var btIPv6 = document.getElementById("btIPv6");
  var btIPv6c = document.getElementById("btIPv6c");
  var btIPv6a = document.getElementById("btIPv6a");
  var imglanguage = document.getElementById("imglanguage");
  /* the DOM variable above are for compatibility wit IE */
  var ipversionv4;
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  if (ipversionv4) changeIPv4IPv6();
  changeClassButton(btIPv6c);
  changeClassSelecthostsnb('IPv6');
  lang=imglanguage.className.replace('imglanguage').trim();
  readselectbits(lang);
  IP.value=condense(IP.value);
  changeSubnet();
  bitsToHostsnb();
  bitsToIPsnb();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

var ipv6alternative=0;
function calculwithIPv6alternative() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var btIPv6 = document.getElementById("btIPv6");
  var btIPv6c = document.getElementById("btIPv6c");
  var btIPv6a = document.getElementById("btIPv6a");
  var subnet = document.getElementById("subnet");
  var broadcast = document.getElementById("broadcast");
  var hostfrom = document.getElementById("hostfrom");
  var hostto = document.getElementById("hostto");
  var imglanguage = document.getElementById("imglanguage");
  /* the DOM variable above are for compatibility wit IE */
  var ipversionv4;
  var retval= new Array(8);
  var infoip= new Array(2);
  
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  if (ipversionv4) changeIPv4IPv6();
  changeClassButton(btIPv6a);
  changeClassSelecthostsnb('IPv6');
  lang=imglanguage.className.replace('imglanguage').trim();
  readselectbits(lang);
  error=checkIPaddress(IP.value,retval,infoip);
  IP.value=transformIPtotxt(0,retval);
  changeSubnet();
  bitsToHostsnb();
  bitsToIPsnb();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  IP.value=condense(IP.value);
  subnet.value=condense(subnet.value);
  broadcast.value=condense(broadcast.value);
  hostfrom.value=condense(hostfrom.value);
  hostto.value=condense(hostto.value);
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

function changeIPv4() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  var subnet = document.getElementById("subnet");
  var hostfrom = document.getElementById("hostfrom");
  var hostto = document.getElementById("hostto");
  var netmask = document.getElementById("netmask");
  var hostsnb = document.getElementById("hostsnb");
  var ipsnb = document.getElementById("ipsnb");
  var imglanguage = document.getElementById("imglanguage");
  var selecthostsnb = document.getElementById("selecthostsnb");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var ipval,ipvaltxt;
  var tipv4= new Array(4);
  var tempval;
  var infoip= new Array(2);
  
  ipval=IP.value;
  error=checkIPaddress(ipval,retval,infoip);
  tipv4[0]= retval[6]>>8;
  tipv4[1]= retval[6] & 255;
  tipv4[2]= retval[7]>>8;
  tipv4[3]= retval[7] & 255;
  IP.value= tipv4[0].toString(10)+'.'+tipv4[1].toString(10)+'.'+tipv4[2].toString(10)+'.'+tipv4[3].toString(10);

  changeClassButton(btIPv4);
  changeClassSelecthostsnb('IPv4');
  lang=imglanguage.className.replace('imglanguage').trim();
  readselectbits(lang);
  var tempval=parseInt(bits.value,10);
  bitszone=96;
  if (tempval>bitszone) {
 	   bits.value= tempval-bitszone;
 	   netmask.value= tempval-bitszone;
  	   hostsnb.value= tempval-bitszone;
 	   ipsnb.value= tempval-bitszone;
	   }
  else if (tempval>64) {
 	   bits.value= tempval-64;
 	   netmask.value= tempval-64;
  	   hostsnb.value= tempval-64;
 	   ipsnb.value= tempval-64;
  } else if (tempval>48) {
 	   bits.value= tempval-48;
 	   netmask.value= tempval-48;
  	   hostsnb.value= tempval-48;
 	   ipsnb.value= tempval-48;
  } else if (tempval>32) {
 	   bits.value= tempval-32;
 	   netmask.value= tempval-32;
  	   hostsnb.value= tempval-32;
 	   ipsnb.value= tempval-32;
  } else {
 	   bits.value= tempval;
 	   netmask.value= tempval;
 	   hostsnb.value= tempval;
 	   ipsnb.value= tempval;
 	}
//  calculwithIPv6condensed();
//	calculwithIPv6alternative();
  changeSubnet();
  bitsToHostsnb();
  bitsToIPsnb();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

function changeIPv6() {
  var IP = document.getElementById("IP");
  var btIPv6 = document.getElementById("btIPv6");
  var bits = document.getElementById("bits");
  var netmask = document.getElementById("netmask");
  var hostsnb = document.getElementById("hostsnb");
  var ipsnb = document.getElementById("ipsnb");
  var imglanguage = document.getElementById("imglanguage");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var ipval,ipvaltxt;
  var tipv4= new Array(4);
  var tempval;
  var infoip= new Array(2);
  
  ipval=IP.value;
  error=checkIPaddress(ipval,retval,infoip);
  // certaines adresse IP recoivent un autre prefix
  if ((0xE000<=retval[6]) && (retval[6]<0xF000))	    retval[0]=0xFF00; // multicast 224.x.x.x 239.x.x.x
  else if ((0x7F00<=retval[6]) && (retval[6]<0x8000)) retval[0]=0;      // 127.x.x.x
  else if ((0x0A00<=retval[6]) && (retval[6]<0x0B00)) retval[0]=0xFE80; // private class A
  else if ((0xAC10<=retval[6]) && (retval[6]<0xAC20)) retval[0]=0xFE80; // private class B
  else if (0xC0A8==retval[6])			    retval[0]=0xFE80; // private class C
  else retval[0]=0x2002;
  // change les autres champs
  ipvaltxt= transformIPtotxt(0,retval);
// 	ipvaltxt=retval[0].toString(16)+':'+retval[1].toString(16)+':'+retval[2].toString(16)
// 	   +':'+retval[3].toString(16)+':'+retval[4].toString(16)+':'+retval[5].toString(16)
// 	   +':'+retval[6].toString(16)+':'+retval[7].toString(16);
  IP.value= ipvaltxt;
  
  changeClassButton(btIPv6);
  changeClassSelecthostsnb('IPv6');
  lang=imglanguage.className.replace('imglanguage').trim();
  readselectbits(lang);
  tempval=parseInt(bits.value,10);
  if (0>=tempval) tempval=1;
  bits.value= tempval;
  netmask.value= tempval;
  hostsnb.value= tempval;
  ipsnb.value= tempval;
  changeSubnet();
  bitsToHostsnb();
  bitsToIPsnb();
  getBroadcast();
  getHostfrom();
  getHostTo();
  changeInfo();
  calculBitsToSelectHostsnb();
  storeAllCookie();
}

function changeIPv4IPv6() {
  var btIPv4 = document.getElementById("btIPv4");
  /* the DOM variable above are for compatibility wit IE */
  var retval= new Array(8);
  var ipval,ipvaltxt;
  var tipv4= new Array(4);
  var tempval;
  var infoip= new Array(2);

  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  if (ipversionv4) {
  	// change to IPv6
	changeIPv6();
  }
  else {
  	// change to IPv4
	changeIPv4();
  }
}

function change_class(theclass)
{
  var btIPv4 = document.getElementById("btIPv4");
  var btIPv6 = document.getElementById("btIPv6");
  var btIPv6c = document.getElementById("btIPv6c");
  var btIPv6a = document.getElementById("btIPv6a");
  /* the DOM variable above are for compatibility wit IE */
  switch(theclass) {
    case 'ipv4classa':
	initializeValues('IPv4','1.0.0.1',8,'255.0.0.0','1.0.0.0','1.255.255.255','1.0.0.1','1.255.255.254',16777214,16777216);
	changeIPv4();
	changeInfo();
      break;
    case 'ipv4classb':
	initializeValues('IPv4','128.0.0.1',16,'255.255.0.0','128.0.0.0','128.0.255.255','128.0.0.1','128.0.255.254',65534,65536);
	changeIPv4();
	changeInfo();
      break;
    case 'ipv4classc':
	initializeValues('IPv4','192.0.0.1',24,'255.255.255.0','192.0.0.0','192.0.0.255','192.0.0.1','192.0.0.254',254,256);
	changeIPv4();
	changeInfo();
      break;
    case 'ipv4classd':
	initializeValues('IPv4','224.0.0.1',8,'255.0.0.0','224.0.0.0','224.255.255.255','224.0.0.1','224.255.255.254',16777214,16777216);
	changeIPv4();
	changeInfo();
      break;
    case 'ipv6reserved':
	initializeValues('IPv6',':4A2B::1f3F',120,'',':4a2b::1f00','ff00:4a2b::1fff',':4a2b::1f01',':4a2b::1ffe',254,256)
	calculwithIPv6condensed();
      break;
    case 'ipv6loopback':
	initializeValues('IPv6','::1',128,'255.0.0.0','::1','ff00::1','::1','::1',1,1)
	  calculwithIPv6condensed();
      break;
    case 'ipv6_2000':
	initializeValues('IPv6','2000:4A2B::1f3F',120,'','2000:4a2b::1f00','ff00:4a2b::1fff','2000:4a2b::1f01','2000:4a2b::1ffe',254,256)
	  calculwithIPv6condensed();
      break;
    case 'ipv6_2001':
	initializeValues('IPv6','2001:4A2B::1f3F',48,'','2001:4a2b::1f00','ff00:4a2b::1fff','2001:4a2b::1f01','2001:4a2b::1ffe',254,256)
	  if (btIPv6c.className.indexOf('active')>=0) { calculwithIPv6condensed(); }
	  else { calculwithIPv6alternative(); }
      break;
    case 'ipv6_2002':
	initializeValues('IPv6','2002::123.45.67.89',48,'','2002::123.45.67.64','ff00:4a2b::1fff','2002:4a2b::1f01','2002:4a2b::1ffe',62,64)
	  if (btIPv6c.className.indexOf('active')>=0) { calculwithIPv6condensed(); }
	  else { calculwithIPv6alternative(); }
      break;
    case 'ipv6multi':
	initializeValues('IPv6','FF00:4A2B::1f3F',48,'','FF00:4a2b::1f00','ff00:4a2b::1fff','FF00:4a2b::1f01','FF00:4a2b::1ffe',254,256)
	calculwithIPv6condensed();
      break;
    case 'ipv6linklocal':
	initializeValues('IPv6','FE85:4A2B::1f3F',120,'','FE85:4a2b::1f00','ff00:4a2b::1fff','FE85:4a2b::1f01','FE85:4a2b::1ffe',254,256)
	  if (btIPv6c.className.indexOf('active')>=0) { calculwithIPv6condensed(); }
	  else { calculwithIPv6alternative(); }
      break;
    case 'ipv6sitelocal':
	initializeValues('IPv6','FEC1:4A2B::1f3F',120,'','FEC1:4a2b::1f00','ff00:4a2b::1fff','0xFEC1:4a2b::1f01','0xFEC1:4a2b::1ffe',254,256)
	  if (btIPv6c.className.indexOf('active')>=0) { calculwithIPv6condensed(); }
	  else { calculwithIPv6alternative(); }
      break;
    case 'ipv6localipv4':
	initializeValues('IPv6','FE80::172.30.67.89',120,'','FE80::172.30.67.64','FE80::AC10:43ff','FE80::AC10:4301','FE80::AC10:43fe',254,256)
	  if (btIPv6c.className.indexOf('active')>=0) { calculwithIPv6condensed(); }
	  else { calculwithIPv6alternative(); }
      break;
    case 'ipv6_6bone':
	initializeValues('IPv6','3FFE:4A2B::1f3F',120,'','3FFE:4a2b::1f00','ff00:4a2b::1fff','3FFE:4a2b::1f01','3FFE:4a2b::1ffe',254,256)
	  if (btIPv6c.className.indexOf('active')>=0) { calculwithIPv6condensed(); }
	  else { calculwithIPv6alternative(); }
      break;
    default:
      alert("error change_class");
      break;
  }
}

var messageIPv6txt= new Array(''
	,'reserved & Loopback="::1" & any="::".'
	,'Unassigned.'
	,'Reserved for NSAP Allocation, Prefix(binary)=0000 001 .'
	,'Reserved for IPX Allocation, Prefix(binary)=0000 010 .'
	,'allocated IPv6 address for internet. "2000::/16" before the official begin 2001. "2001::/16" after 2001. "2002::/16" for routing IPv6 to IPv4 on the internet.'
	,'Multicast.'
	,'Link-local unicast. Here are converted the IPv4 private addresses.'
	,'Site-local unicast. Here are converted the IPv4 private addresses.'
	,'6bone "3ffe::/16" for research in IPv6 backbone.'
	,'IP reserved for future usage.'
	);

var messageIPv4txt= new Array(''
	,'class A from 1.x.x.x 127.x.x.x'
	,'class B from 128.x.x.x 191.x.x.x'
	,'class C from 192.x.x.x 223.x.x.x'
	,'multicast 224.x.x.x 239.x.x.x'
	,'other     240.x.x.x 255.x.x.x'
	,'localhost 127.x.x.x'
	,'private class A'
	,'private class B'
	,'private class C'
	);

function infoIPv4v6(){
  var infoIPv4v6txt = document.getElementById("infoIPv4v6txt");
  var infoIPv4v6btn = document.getElementById("infoIPv4v6btn");
  var iframeinfo = document.getElementById("iframeinfo");
  var selecthostsnb = document.getElementById("selecthostsnb");
  /* the DOM variable above are for compatibility wit IE */
	txt=infoIPv4v6txt.className;
	btn=infoIPv4v6btn.className;
	iframeinfo.style.display='none';
	if (txt.indexOf('hidetxt')<0){
	  txt= txt.replace('showtxt','').trim();
	  txt= txt.replace(/\s+/gi," ");
	  btn= btn.replace('showtxt','').trim();
	  btn= btn.replace(/\s+/gi," ");
	  infoIPv4v6txt.className=txt +' hidetxt';
	  infoIPv4v6btn.className=btn +' hidetxt';
	} else {
	  txt= txt.replace('hidetxt','').trim();
	  txt= txt.replace(/\s+/gi," ");
	  btn= btn.replace('hidetxt','').trim();
	  btn= btn.replace(/\s+/gi," ");
	  infoIPv4v6txt.className=txt +' showtxt';
	  infoIPv4v6btn.className=btn +' showtxt';
	  iframeinfo.style.display='inline';
	  //infoIPv4v6txt.innerHTML = explanation;
	  lang= imglanguage.className.replace('imglanguage','').trim();
	  if ((lang=='WORLD') || (lang=='US')|| (lang=='UK')) lang='EN';
	  iframeinfo.src ="./lang/infoIPv4v6-"+lang+".html"; // #p1";
      //iframeinfo.contentDocument.location.reload(true);
	  iframeinfo.style.display='inline';
//      $("#infoIPv4v6txt").load("./lang/infoIPv4v6-"+lang+".html #p1", function(responseTxt, statusTxt, xhr){
//		if (statusTxt != "success") {
//			iframeinfo.style.display='inline';
//			iframeinfo.style.visibility='visible';
//		}
        //if(statusTxt == "success")
        //    alert("External content loaded successfully!");
        //if(statusTxt == "error")
        //    alert("Error: " + xhr.status + ": " + xhr.statusText);
//      });
	}
}

function changeInfo() {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var infotxt = document.getElementById("infotxt");
  /* the DOM variable above are for compatibility wit IE */
  var txt='',valip,ipversionv4;
  var retval= new Array(8);
  var partip4 = new Array(4);  
  var info= new Array(2);
  
  ipversionv4=(btIPv4.className.indexOf('active')>=0);
  valip=IP.value;
  noerror=findIPversion(valip,retval,partip4,info);
  if (noerror) {
//alert('IPV6 format:'+retval[0].toString(16)+':'+retval[1].toString(16)+':'+retval[2].toString(16)+':'+retval[3].toString(16)+':'
//+retval[4].toString(16)+':'+retval[5].toString(16)+':'+retval[6].toString(16)+':'+retval[7].toString(16));
   if (ipversionv4) {
    if ((0x7F00<=retval[6]) && (retval[6]<0x8000))	   txt=messageIPv4txt[6]; // localhost 127.x.x.x
    else if ((0x0A00<=retval[6]) && (retval[6]<0x0B00))	   txt=messageIPv4txt[7]; // private class A
    else if ((0xAC10<=retval[6]) && (retval[6]<0xAC20))	   txt=messageIPv4txt[8]; // private class B
    else if (0xC0A8==retval[6])				   txt=messageIPv4txt[9]; // private class C
    else if ((0x0100<=retval[6]) && (retval[6]<0x7F00))    txt=messageIPv4txt[1]; // class A 1.x.x.x 127.x.x.x
    else if ((0x8000<=retval[6]) && (retval[6]<0xC000))    txt=messageIPv4txt[2]; // class A 128.x.x.x 191.x.x.x
    else if ((0xC000<=retval[6]) && (retval[6]<0xE000))    txt=messageIPv4txt[3]; // class A 192.x.x.x 223.x.x.x
    else if ((0xE000<=retval[6]) && (retval[6]<0xF000))    txt=messageIPv4txt[4]; // multicast 224.x.x.x 239.x.x.x
    else if ((0xF000<=retval[6]) &&(retval[6]<=0xFF00))    txt=messageIPv4txt[5]; // other     240.x.x.x 255.x.x.x
    else 						   txt=messageIPv4txt[0];
   } else { //IPv6 messages
    if (retval[0]==0x0000) 				   txt=messageIPv6txt[1];
    else if (retval[0]==0x0001) 			   txt=messageIPv6txt[2];
    else if ((0x0002<=retval[0]) & (retval[0]<=0x0003))    txt=messageIPv6txt[3];
    else if (retval[0] == 0x0004) 			   txt=messageIPv6txt[4];
    else if ((0x2000<=retval[0]) & (retval[0]<=0x2002))	   txt=messageIPv6txt[5];
    else if ((retval[0] & 0xFF00)==0xFF00)		   txt=messageIPv6txt[6]+explanation;
    else if ((retval[0] & 0xFFC0)==0xFE80)		   txt=messageIPv6txt[7];
    else if ((retval[0] & 0xFFC0)==0xFEC0)		   txt=messageIPv6txt[8];
    else if (retval[0]==0x3FFE)				   txt=messageIPv6txt[9];
    else						   txt=messageIPv6txt[10];
   }
  } else alerterrorIP(retval,partip4,info);
  infotxt.value=txt;
}

function openhelp2() {
  var theLocation='help.txt';
  var fileContent='',f;
  f = new File(theLocation);
  if (f.open("r") == true)
  {
    while(!f.eof())
    {
     fileContent += f.read(1);
    }
    f.close();
  }
  alert(fileContent);
}

function openhelp() {
  var datafile='help.txt';
  var fileContent='',f;
  
  typenavigator=browsertype();
  if (typenavigator!=='IE') {
     objXml = new XMLHttpRequest();
     objXml.open("GET",datafile,false);
     objXml.send(null);
     alert(objXml.responseText);
  } else {
    objXml = new ActiveXObject("Microsoft.XMLHTTP");
    objXml.open("GET", datafile, true);
    objXml.onreadystatechange=function() {
      if (objXml.readyState==4) {
       alert(objXml.responseText);
     }
    }
    objXml.send(null);
  }
}

function openhelp3() {
  var datafile=getScriptPath(); //'help.txt';
  var fileContent='',f;
  fh = fopen(datafile, 0); // Open the file for reading
  if(fh!=-1) // If the file has been successfully opened
  {
    length = flength(fh);         // Get the length of the file    
    str = fread(fh, length);     // Read in the entire file
    fclose(fh);                    // Close the file

    // Display the contents of the file    
    alert(str);    
  }
}

function changeDivLanguageText(object,lang){
	a=object.className;
	a= a.replace('WORLD','');
	a= a.replace('UK','');
	a= a.replace('FR','');
	a= a.replace('US','');
	a= a.replace('DE','');
	a= a.replace('IT','');
	a= a.trim();
	if (a=='') { object.className = lang.toUpperCase(); }
	else {object.className = a+' '+lang.toUpperCase();}
}

function setlanguageObjects(lang) {
  var maintitle = document.getElementById("maintitle");
  var imglanguage = document.getElementById("imglanguage");
  var panelformat = document.getElementById("panelformat");
  var panelcalculationtxt = document.getElementById("panelcalculationtxt");
  var infoIPv4v6btn = document.getElementById("infoIPv4v6btn");
  var iframeinfo = document.getElementById("iframeinfo");
  /* the DOM variable above are for compatibility wit IE */
	imglanguage.className='imglanguage '+lang;
	imglanguage.src='./images/'+lang+'-flg.png';
	changeDivLanguageText(maintitle,lang);
	changeDivLanguageText(panelformat,lang);
	changeDivLanguageText(panelcalculationtxt,lang);
	changeDivLanguageText(infoIPv4v6btn,lang);
	changeDivLanguageText(iframeinfo,lang);
	readselectbits(lang);
}

function changelanguage(lang) {
	setlanguageObjects(lang);
    storeAllCookie();
}

function readhtmlselectbits(){
  var imglanguage = document.getElementById("imglanguage");
  readselectbits(lang);
}

function readselectbits(lang) {
  var IP = document.getElementById("IP");
  var btIPv4 = document.getElementById("btIPv4");
  var bits = document.getElementById("bits");
  var selecthostsnb = document.getElementById("selecthostsnb");
  /* the DOM variable above are for compatibility wit IE */
  var selectstr="",selectval="",options ='';
  lang = lang.replace('imglanguage','');
  lang = lang.trim();
  ipversion=(btIPv4.className.indexOf('active')>=0) ? 'IPv4':'IPv6';
  selectstr= getBitsHumanformat(ipversion,lang);
  if (selectstr=='') {
	  selectstr= '32;IPv4 (32bits) => 1 IP'+";;"
	     +'31;IPv4 (31bits) => 2 IPs'+";;"
		 +'30;IPv4 (30bits) => 4 IPs'+";;"
		 +'29;IPv4 (29bits) => 8 IPs'+";;"
		 +'28;IPv4 (28bits) => 16 IPs'+";;"
		 +'27;IPv4 (27bits) => 32 IPs'+";;"
		 +'26;IPv4 (26bits) => 64 IPs'+";;"
		 +'25;IPv4 (25bits) => 128 IPs'+";;";
		 +'24;IPv4 (24bits) => 254 IPs';
  }
  selectstrlist= selectstr.split(';;');
  var x = selecthostsnb.childNodes;
  for (var i = x.length-1; i >=0 ; i--) {
    selecthostsnb.removeChild(x[i]);
  }
  for (i=0;i<selectstrlist.length;i++) {
	var val = selectstrlist[i].split(';');
    var option=document.createElement("option");
	option.text=val[1];
	option.value=val[0];
	option.id='optionselectstr'+val[0];
	selecthostsnb.add(option);
    selecthostsnb.value=bits.value;	
  }
}

function getBitsHumanformat(version,lang) {
	var str='',astr,fi;
	var number;
	var large_numbers;
	astr=[
      '1'
     ,'2'
     ,'4'
     ,'8'
     ,'16'
     ,'32'
     ,'64'
     ,'128'
     ,'256'
     ,'512'
     ,'1024'
     ,'2048'
     ,'4096'
     ,'8192'
     ,'16384'
     ,'32768'
     ,'65536'
     ,'131072'
     ,'262144'
     ,'524288'
     ,'1048576'
     ,'2097152'
     ,'4194304'
     ,'8388608'
     ,'16777216'
     ,'33554432'
     ,'67108864'
     ,'134217728'
     ,'268435456'
     ,'536870912'
     ,'1073741824'
     ,'2147483648'
     ,'4294967296'
     ,'8589934592'
     ,'17179869184'
     ,'34359738368'
     ,'68719476736'
     ,'137438953472'
     ,'274877906944'
     ,'549755813888'
     ,'1099511627776'
     ,'2199023255552'
     ,'4398046511104'
     ,'8796093022208'
     ,'17592186044416'
     ,'35184372088832'
     ,'70368744177664'
     ,'140737488355328'
     ,'281474976710656'
     ,'562949953421312'
     ,'1.12589990684262E+015'
     ,'2.25179981368525E+015'
     ,'4.5035996273705E+015'
     ,'9.00719925474099E+015'
     ,'1.8014398509482E+016'
     ,'3.6028797018964E+016'
     ,'7.20575940379279E+016'
     ,'1.44115188075856E+017'
     ,'2.88230376151712E+017'
     ,'5.76460752303424E+017'
     ,'1.15292150460685E+018'
     ,'2.30584300921369E+018'
     ,'4.61168601842739E+018'
     ,'9.22337203685478E+018'
     ,'1.84467440737096E+019'
     ,'3.68934881474191E+019'
     ,'7.37869762948382E+019'
     ,'1.47573952589676E+020'
     ,'2.95147905179353E+020'
     ,'5.90295810358706E+020'
     ,'1.18059162071741E+021'
     ,'2.36118324143482E+021'
     ,'4.72236648286965E+021'
     ,'9.44473296573929E+021'
     ,'1.88894659314786E+022'
     ,'3.77789318629572E+022'
     ,'7.55578637259143E+022'
     ,'1.51115727451829E+023'
     ,'3.02231454903657E+023'
     ,'6.04462909807315E+023'
     ,'1.20892581961463E+024'
     ,'2.41785163922926E+024'
     ,'4.83570327845852E+024'
     ,'9.67140655691703E+024'
     ,'1.93428131138341E+025'
     ,'3.86856262276681E+025'
     ,'7.73712524553363E+025'
     ,'1.54742504910673E+026'
     ,'3.09485009821345E+026'
     ,'6.1897001964269E+026'
     ,'1.23794003928538E+027'
     ,'2.47588007857076E+027'
     ,'4.95176015714152E+027'
     ,'9.90352031428304E+027'
     ,'1.98070406285661E+028'
     ,'3.96140812571322E+028'
     ,'7.92281625142643E+028'
     ,'1.58456325028529E+029'
     ,'3.16912650057057E+029'
     ,'6.33825300114115E+029'
     ,'1.26765060022823E+030'
     ,'2.53530120045646E+030'
     ,'5.07060240091292E+030'
     ,'1.01412048018258E+031'
     ,'2.02824096036517E+031'
     ,'4.05648192073033E+031'
     ,'8.11296384146067E+031'
     ,'1.62259276829213E+032'
     ,'3.24518553658427E+032'
     ,'6.49037107316853E+032'
     ,'1.29807421463371E+033'
     ,'2.59614842926741E+033'
     ,'5.19229685853483E+033'
     ,'1.03845937170697E+034'
     ,'2.07691874341393E+034'
     ,'4.15383748682786E+034'
     ,'8.30767497365573E+034'
     ,'1.66153499473114E+035'
     ,'3.32306998946229E+035'
     ,'6.64613997892458E+035'
     ,'1.32922799578492E+036'
     ,'2.65845599156983E+036'
     ,'5.31691198313966E+036'
     ,'1.06338239662793E+037'
     ,'2.12676479325587E+037'
     ,'4.25352958651173E+037'
     ,'8.50705917302346E+037'
     ,'1.70141183460469E+038'
     ,'3.40282366920938E+038'
	 ];
  large_numbers = [
[0,'US','UK','EU'],
[1,'','',''],
[2,'','',''],
[3,'','',''],
[4,'','',''],
[5,'','',''],
[6,'Million','Million','Million'],
[6,'Million','Million','Million'],
[6,'Million','Million','Million'],
[9,'Billion','Thousand million','Milliard'],
[9,'Billion','Thousand million','Milliard'],
[9,'Billion','Thousand million','Milliard'],
[12,'Trillion','Billion','Billion'],
[12,'Trillion','Billion','Billion'],
[12,'Trillion','Billion','Billion'],
[15,'Quadrillion','Thousand billion','Billiard'],
[15,'Quadrillion','Thousand billion','Billiard'],
[15,'Quadrillion','Thousand billion','Billiard'],
[18,'Quintillion','Trillion','Trillion'],
[18,'Quintillion','Trillion','Trillion'],
[18,'Quintillion','Trillion','Trillion'],
[21,'Sextillion','Thousand trillion','Trilliard'],
[21,'Sextillion','Thousand trillion','Trilliard'],
[21,'Sextillion','Thousand trillion','Trilliard'],
[24,'Septillion','Quadrillion','Quadrillion'],
[24,'Septillion','Quadrillion','Quadrillion'],
[24,'Septillion','Quadrillion','Quadrillion'],
[27,'Octillion','Thousand quadrillion','Quadrilliard'],
[27,'Octillion','Thousand quadrillion','Quadrilliard'],
[27,'Octillion','Thousand quadrillion','Quadrilliard'],
[30,'Nonillion','Quintillion','Quintillion'],
[30,'Nonillion','Quintillion','Quintillion'],
[30,'Nonillion','Quintillion','Quintillion'],
[33,'Decillion','Thousand quintillion','Quintilliard'],
[33,'Decillion','Thousand quintillion','Quintilliard'],
[33,'Decillion','Thousand quintillion','Quintilliard'],
[36,'Undecillion','Sextillion','Sextillion'],
[36,'Undecillion','Sextillion','Sextillion'],
[36,'Undecillion','Sextillion','Sextillion']
  ];
  /* the DOM variable above are for compatibility wit IE */
   switch (lang.toUpperCase()) {
	  case 'FR': fi = 3; break;
	  case 'DE': fi = 3; break;
	  case 'IT': fi = 3; break;
	  case 'UK': fi = 2; break;
	  case 'DE': fi = 3; break;
	default:
      fi = 1;
  }
  if (version=='IPv4') { max= 32; } else { max=128;}
  for (var i=0,j=max;i<astr.length;i++) {
  	var val= astr[i],val2,chiffre;
  	var poweridx,power,nbr;
  	if (val.indexOf('E+')>=0) {
  	  poweridx = val.indexOf('E+');
  	  power= val.substring(poweridx+3);
  	  val2 = val.replace('.','');
  	  nbr=val2.substring(0,power-large_numbers[power][0]+1);
  	  number = large_numbers[power][fi];
  	  chiffre=nbr+' '+number;
  	  val = chiffre + " = "+val;
  	}
	prefix='not standard ';
	if ((j==127) || (j<=48)) {
       if (version=='IPv4') prefix="IPv4 ";
	   else prefix='IPv6 ';
	}
  	if (str=='') str = j+ ';' + prefix + '(' + j + 'bits) => '+ val+" IP(s)";
      else str = str+ ';;' + j+ ';' + prefix + '(' + j + 'bits) => '+ val+" IP(s)";
	j--;
	if (j<=0) break;
  }
  return str;
}

function openreadfile(datafile) {
  var fs = require('fs');
  var file = fs.readFileSync(datafile, "utf8");
  console.log(file);
  alert(data);
}

function browsertype(){
  var thisbrowser;
  if(document.layers){
    browser="netscape4";
  }
  if(document.all){
    browser="IE"
  }
  if(!document.all && document.getElementById){
    browser="netscape6";
  }
  return browser;
}
