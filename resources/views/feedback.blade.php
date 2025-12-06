<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Laisser un avis</title>
</head>
<body>

<h2>Laisser votre avis</h2>

<form action="/api/feedback" method="POST">
    @csrf

    <!-- Le lien vers ce formulaire -->
    <input type="hidden" name="link" value="{{ request()->fullUrl() }}">

    <!-- ID du client et de la commande -->
    <input type="hidden" name="customer_id" value="{{ request()->get('customer_id') }}">
    <input type="hidden" name="order_id" value="{{ request()->get('order_id') }}">

    <label>Note :</label>
    <select name="rating">
        <option value="">-- choisir --</option>
        <option value="1">★</option>
        <option value="2">★★</option>
        <option value="3">★★★</option>
        <option value="4">★★★★</option>
        <option value="5">★★★★★</option>
    </select>

    <br><br>

    <label>Commentaire :</label>
    <textarea name="comment"></textarea>

    <br><br>

    <button type="submit">Envoyer</button>
</form>

</body>
</html>
