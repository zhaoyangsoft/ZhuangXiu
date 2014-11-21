<span><a href="{dede:field name='typeurl'/}">{dede:field name='typename'/}</a></span>
{dede:sql sql='Select * from dede_arctype where reid=~id~  ORDER BY id limit 0,10'}
<li><a href='[field:typedir/]' target='_blank'>[field:typename/]</a></li>
{/dede:sql}