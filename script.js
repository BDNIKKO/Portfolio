$(document).ready(function() {
    $('.social-icon').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-10px) scale(1.2) rotateZ(5deg)',
                'box-shadow': '0 10px 30px rgba(102, 126, 234, 0.6)'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0) scale(1) rotateZ(0)',
                'box-shadow': 'none'
            });
        }
    );

    $('.skill-item').hover(
        function() {
            $(this).find('i').css({
                'transform': 'scale(1.3) rotateY(360deg)',
                'transition': 'transform 0.6s ease'
            });
        },
        function() {
            $(this).find('i').css({
                'transform': 'scale(1) rotateY(0deg)'
            });
        }
    );

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    $(window).on('scroll', function() {
        $('.glass-card').each(function() {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < windowBottom - 100) {
                $(this).addClass('visible');
            }
        });
    });

});

function fetchGitHubRepos() {
    const username = 'BDNIKKO';
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(repos) {
            $('.repos-loading').fadeOut(500, function() {
                displayRepos(repos);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching repos:', error);
            $('.repos-loading').html(`
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load repositories. Please try again later.</p>
            `);
        }
    });
}

function displayRepos(repos) {
    const reposContainer = $('#repos-container');
    const pinnedRepoNames = [
        'BriefVault',
        'L07HandsOn',
        'Nexus_Lending_Solutions'
    ];
    
    const pinnedRepos = repos.filter(repo => pinnedRepoNames.includes(repo.name));
    
    pinnedRepos.sort((a, b) => {
        return pinnedRepoNames.indexOf(a.name) - pinnedRepoNames.indexOf(b.name);
    });

    const topRepos = pinnedRepos;

    if (topRepos.length === 0) {
        reposContainer.html('<p class="no-repos">No public repositories found.</p>');
        return;
    }

    topRepos.forEach((repo, index) => {
        const repoCard = createRepoCard(repo);
        repoCard.hide().delay(index * 100).fadeIn(600);
        reposContainer.append(repoCard);
    });
}

function createRepoCard(repo) {
    const description = repo.description || 'No description available';
    const language = repo.language || 'Code';
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    
    const card = $('<div>').addClass('repo-card').html(`
        <div class="repo-header">
            <i class="fas fa-folder-open repo-icon"></i>
            <h3 class="repo-name">${repo.name}</h3>
        </div>
        <p class="repo-description">${description}</p>
        <div class="repo-stats">
            <div class="repo-stat">
                <i class="fas fa-star"></i>
                <span>${stars}</span>
            </div>
            <div class="repo-stat">
                <i class="fas fa-code-branch"></i>
                <span>${forks}</span>
            </div>
        </div>
        <div class="language-badge">${language}</div>
    `);

    card.on('click', function() {
        window.open(repo.html_url, '_blank');
    });

    card.hover(
        function() {
            $(this).css('cursor', 'pointer');
        },
        function() {
            $(this).css('cursor', 'default');
        }
    );

    return card;
}

// Parallax background effect
$(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    $('.shape-1').css('transform', `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`);
    $('.shape-2').css('transform', `translate(${-scrolled * 0.1}px, ${-scrolled * 0.15}px)`);
    $('.shape-3').css('transform', `translate(${scrolled * 0.05}px, ${-scrolled * 0.1}px)`);
});

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.text('');
    
    function type() {
        if (i < text.length) {
            element.text(element.text() + text.charAt(i));
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

$(document).ready(function() {
    fetchGitHubRepos();
    $(window).trigger('scroll');
    
    const currentYear = new Date().getFullYear();
    $('.copyright').html(`&copy; ${currentYear} Nicholas David Moppert. Designed with <i class="fas fa-heart"></i> and Code`);
    
    const taglineText = $('.tagline').text();
    typeWriter($('.tagline'), taglineText, 30);
    
    handleResumeButtonScroll();
});

function handleResumeButtonScroll() {
    const resumeBtn = $('#resumeBtn');
    const header = $('.header');
    const originalParent = resumeBtn.parent();
    let isFloating = false;
    
    $(window).on('scroll', function() {
        const headerBottom = header.offset().top + header.outerHeight();
        const scrollPos = $(window).scrollTop();
        
        if (scrollPos > headerBottom - 100) {
            if (!isFloating) {
                resumeBtn.addClass('floating');
                $('body').append(resumeBtn);
                isFloating = true;
            }
        } else {
            if (isFloating) {
                resumeBtn.removeClass('floating');
                originalParent.append(resumeBtn);
                isFloating = false;
            }
        }
    });
}

