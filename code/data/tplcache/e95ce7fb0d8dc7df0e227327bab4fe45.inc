
　[field:description/]

　{dede:field.typeid runphp='yes' function="GetTopid(@me)"}
　　$dsql = new DedeSql(false);
　　$a="SELECT typename FROM dede_arctype where id=@me";
　　$arcRow = $dsql->GetOne($a);
　　@me=$arcRow[typename];{/dede:field.typeid}

　　