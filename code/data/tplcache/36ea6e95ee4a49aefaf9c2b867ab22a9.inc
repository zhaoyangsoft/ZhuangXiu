<li><a href='{dede:field name='typeurl'/}'>{dede:field name='typename'/}</a></li>
{dede:sql sql='Select * from zx_arctype where reid=3'}
<li><a href='[field:typedir function='str_replace("{cmspath}","",@me)'/]'>[field:typename/]</a></li>
{/dede:sql}