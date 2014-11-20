<?php
$z[0]=Array("global","",66,92);
$z[0][4]['name']="cfg_webname";
$z[1]=Array("include","",108,148);
$z[1][4]['filename']="head_init.htm";
$z[2]=Array("global","",183,215);
$z[2][4]['name']="cfg_templets_skin";
$z[3]=Array("include","",283,320);
$z[3][4]['filename']="header.htm";
$z[4]=Array("channelartlist","\r\n                            <h1 class=\"title\">{dede:field name=description function=html2text(@me)/}</h1>\r\n                            <p class=\"info visible_desktop\">\r\n                            </p>\r\n                            <a href=\"[field:typelink /]\" class=\"mod_btn more\">\r\n                                <span class=\"icon_plus\"></span>\r\n                                <span class=\"txt\">查看更多</span>\r\n                            </a>\r\n                            ",4309,4846);
$z[4][4]['typeid']="3";
$z[5]=Array("sql","\r\n                            [field:description function=\"cn_substr(@me)'/]\r\n                            ",5182,5371);
$z[5][4]['sql']="SELECT content FROM zx_arctype where id=3";
$z[5][4]['infolen']="760";
$z[6]=Array("channel","\r\n　　<a href=\"[field:typelink/]\">[field:typename/]</a>[field:description/]\r\n　　",5394,5530);
$z[6][4]['type']="son";
$z[6][4]['typeid']="2";
$z[7]=Array("global","",7766,7790);
$z[7][4]['name']="cfg_phone";
$z[8]=Array("global","",8036,8063);
$z[8][4]['name']="cfg_contacts";
$z[9]=Array("global","",8302,8323);
$z[9][4]['name']="cfg_qq";
$z[10]=Array("global","",8603,8628);
$z[10][4]['name']="cfg_wechat";
$z[11]=Array("global","",8745,8777);
$z[11][4]['name']="cfg_templets_skin";
$z[12]=Array("global","",9172,9196);
$z[12][4]['name']="cfg_email";
$z[13]=Array("global","",9439,9462);
$z[13][4]['name']="cfg_site";
$z[14]=Array("include","",10064,10101);
$z[14][4]['filename']="footer.htm";
$z[15]=Array("global","",10139,10171);
$z[15][4]['name']="cfg_templets_skin";

?>