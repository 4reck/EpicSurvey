//Pictures
let pics = [ "https://cdn.discordapp.com/avatars/494957550748303426/e7ee6fd9c4901b7d6bd7410cded04f29.webp?size=512", "https://cdn.discordapp.com/avatars/1068156853252534282/3e00afbeca1a423d13d81c4096e51fcb.webp?size=512", "https://cdn.discordapp.com/avatars/491705219277914122/0ebf82c05e94da9aa1aa489c6b32d02f.webp?size=512", "https://cdn.discordapp.com/avatars/798724389293260821/7f4ec753cc322c4c182d67ba041a2a5a.webp?size=512", "https://cdn.discordapp.com/avatars/1099437978536915007/8a8ac588b91ffa6fe0037cc177999d4a.webp?size=512", "https://cdn.discordapp.com/avatars/792234813867819018/0bb5a4e7aa8fbb87ffc7fcdfcf4527cf.webp?size=512", "https://cdn.discordapp.com/avatars/989533663551172648/e5f9ac3fe5fba6b352e3ca6210f5d75d.webp?size=512", "https://cdn.discordapp.com/avatars/614967476643692544/8f010d2453d90e85d151acbd0d80f466.webp?size=512", "https://cdn.discordapp.com/avatars/429853867996610570/85bf6d963018c011244d1d2967422a29.webp?size=512", "https://cdn.discordapp.com/avatars/758524255347671050/d346e43ea2d1c8c6569a84a250dff8dd.webp?size=512", "https://cdn.discordapp.com/avatars/1409307791637614655/ceeda698f5a6fd9d34068d07840f6324.webp?size=512", "https://cdn.discordapp.com/avatars/649799718477496325/688caa921d9df3325fde29e6d8002c62.webp?size=512", "https://cdn.discordapp.com/avatars/473893575822671882/f70d0d33ad602dd2bc3ddcbe554af50b.webp?size=512", "https://cdn.discordapp.com/avatars/617084711541669910/a3638b341f611a5c0dd0857e0c6474b3.webp?size=512", "https://cdn.discordapp.com/avatars/315134311776911360/a_b96310cc9d421f8fae05e2757c1a166a.webp?size=512", "https://cdn.discordapp.com/avatars/628313486782365696/717bc9d2fe025e02983adc22c0340f92.webp?size=512", "https://cdn.discordapp.com/avatars/461676198246744085/5c8dd6129f64c4dbb87e66bef1c122cb.webp?size=512", "https://cdn.discordapp.com/avatars/820120013411188766/5e3c19c97315efbf6988b7b5d0740d77.webp?size=512", "https://cdn.discordapp.com/avatars/544178631610466344/a09ea1dae7c62f2009ba826a87a04d99.webp?size=512", "https://cdn.discordapp.com/avatars/690839482823344128/129b461f421fe659d3820ab92816aebc.webp?size=512"];

//Checkboxes
const categoryIds = ["chd", "gy", "jw", "neutral", "rearded", "slop", "godtier"];
const checkboxes = categoryIds.map((id) => document.getElementById(id));
const pic = document.getElementById("pic");
let cycle = -1;
let isSaving = false;

CyclePic();

async function saveCurrentVote(imageUrl) {
    const selections = Object.fromEntries(
        categoryIds.map((categoryId) => [
            categoryId,
            document.getElementById(categoryId).checked
        ])
    );

    const { error } = await supabaseClient
        .from("image_votes")
        .insert({ image_url: imageUrl, selections });

    if (error) {
        throw error;
    }
}

async function CyclePic() {
    if (isSaving) {
        return;
    }

    if (cycle >= 0 && cycle < pics.length) {
        isSaving = true;
        try {
            await saveCurrentVote(pics[cycle]);
        } catch (error) {
            console.error("Could not save this vote:", error);
            alert("Your vote could not be saved. Check your connection and try again.");
            isSaving = false;
            return;
        }
        isSaving = false;
    }

    cycle++;
    if (cycle >= pics.length) {
        window.location.href = "results.html";
        return;
    }

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
    pic.src = pics[cycle];
}